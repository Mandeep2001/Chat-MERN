const router = require("express").Router();
const multer = require("multer");
const nodemailer = require("nodemailer");
const uuid = require("uuid/v4");
const cloudinary = require("cloudinary").v2;
const User = require("../../models/User");
const userUtils = require("../../../utils/user");
const { verifyAndSendResponse } = require("../verifyToken");
const { api_link } = require("../../../utils/api");

cloudinary.config({
  // cloud_name: process.env.CLOUD_NAME,
  // api_key: process.env.CLOUD_API_KEY,
  // api_secret: process.env.CLOUD_API_SECRET,
  cloud_name: "dqj97mfzi",
  api_key: "547526458386541",
  api_secret: "3k_uNwBtrCG8ej8VTZ75Qsr00D8"
});

const FINDONEANDUPDATE_CONFIG = { useFindAndModify: false, new: true };

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./profile_images");
  },
  filename: (req, file, cb) => {
    const path = uuid() + req.params.username + file.originalname;
    cb(null, path);
  }
});

const upload = multer({ storage });

// GET /
router.get("/:username", (req, res) => {
  const { username } = req.params;

  User.findOne({ username }, (err, user) => {
    if (err) res.status(400).send(`An error has occured: ${err}`);
    res.send(user);
  });
});

router.patch(
  "/:username/update",
  upload.single("selectedImage"),
  (req, res) => {
    let update = { ...req.body };
    if (req.file) update = { ...update, profileImageURL: req.file.path };

    User.update({ username: req.params.username }, update)
      .then(data => res.json({ res: data }))
      .catch(error => res.json({ error }));
  }
);

router.patch("/:username/update_info", async (req, res) => {
  const updateArray = Object.keys(req.body);
  let update = {};

  verifyAndSendResponse(req, res);

  updateArray.forEach(element => {
    if (element === "password") {
      update = {
        ...update,
        [element]: userUtils.hashPassword(req.body[element])
      };
    } else {
      update = { ...update, [element]: req.body[element] };
    }
  });

  User.findOneAndUpdate(
    { username: req.params.username },
    update,
    FINDONEANDUPDATE_CONFIG
  )
    .then(data =>
      res.json({
        api: {
          href: `${api_link}/${req.params.username}/update_info`,
          method: "PATCH",
          body: ["_id", "username", "email", "password"],
          params: ["username"]
        },
        payload: { _id: data._id, username: data.username, email: data.email }
      })
    )
    .catch(error => {
      res.status(404).json({
        error: { message: "User not found.", code: 404 },
        api: {
          href: `${api_link}/${req.params.username}/update_info`,
          method: "PATCH",
          body: ["_id"]
        }
      });
    });
});

router.patch(
  "/:username/update_profile_image",
  upload.single("image"),
  async (req, res) => {
    verifyAndSendResponse(req, res);

    if (!req.file) {
      res.status(400).json({
        error: {
          title: "Errore durante l'aggiornamento dell'immagine",
          message:
            "Devi selezionare un'immagine valida, se continui a rispontrare problemi contattaci.",
          code: 400
        },
        api: {
          href: `${api_link}/${req.params.path}/update_info`,
          method: "PATCH",
          body: ["image"],
          params: ["username"]
        }
      });
    }

    let result;
    try {
      result = await cloudinary.uploader.upload(req.file.path);
    } catch (error) {
      console.log("Errore:", error);
    }

    const update = { profileImageURL: result.url };

    User.findOneAndUpdate(
      { username: req.params.username },
      update,
      FINDONEANDUPDATE_CONFIG
    )
      .then(data => {
        res.status(200).json({
          api: {
            href: `${api_link}/update_profile_image`,
            method: "PATCH",
            body: ["image"],
            params: ["username"]
          },
          payload: {
            profileImageURL: result.url,
            _id: data._id,
            username: data.username
          }
        });
      })
      .catch(error =>
        res.status(500).json({
          error: {
            title: "Errore durante l'aggiornamento dell'immagine",
            message:
              "Devi selezionare un'immagine valida, se continui a rispontrare problemi contattaci.",
            code: 500
          },
          api: {
            href: `${api_link}/${req.params.path}/update_profile_image`,
            method: "PATCH",
            body: ["image"],
            params: ["username"]
          }
        })
      );
  }
);

router.post("/fcm_token", async (req, res) => {
  const { _id, fcmToken } = req.body;
  const updated = await User.findOneAndUpdate(
    { _id },
    { fcmToken },
    FINDONEANDUPDATE_CONFIG
  );
  res.json({
    user: {
      _id: updated._id,
      email: updated.email,
      name: updated.name,
      username: updated.username,
      profileImageURL: updated.profileImageURL,
      fcmToken: updated.fcmToken
    }
  });
});

router.post("/reset_password", async (req, res) => {
  const { email } = req.body;

  let user;
  let token = "";
  let resUser;

  try {
    user = await User.findOne({ email: email });
  } catch (error) {
    console.log("Utente non trovato:", error);
    res.status(400).json("An error has occured.");
    return;
  }

  if (!user) {
    console.log("Utente non trovato.");
    res.status(404).json("User not found.");
    return;
  }

  for (let i = 0; i < 6; i += 1) {
    token += Math.floor(Math.random() * 10);
  }

  try {
    await user.updateOne({
      resetPasswordToken: token,
      resetTokenExpires: Date.now() + 360000
    });
  } catch (error) {
    console.log("Errore:", error);
    return;
  }

  try {
    resUser = await User.findById(user._id);
  } catch (error) {
    console.log("Error:", error);
    return;
  }

  if (!resUser) {
    console.log("L'utente modificato non esiste.");
    res.status(404).json("User not found.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.EMAIL_ADRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`
    }
  });

  const mainOptions = {
    from: "smandeep2001@gmail.com",
    to: `${resUser.email}`,
    subject: "Link to reset password",
    text: `Reset password.\n${resUser.resetPasswordToken}`
  };

  transporter.sendMail(mainOptions, (err, responce) => {
    if (err) {
      console.log("Errore:", err);
    } else {
      res.status(200).json({
        _id: resUser._id,
        username: resUser.username,
        email: resUser.email,
        resetPasswordToken: resUser.resetPasswordToken,
        resetPasswordExpires: resUser.resetPasswordExpires
      });
    }
  });
});

router.post("/verify_reset_password", async (req, res) => {
  const { email, token } = req.body;

  let user;

  try {
    user = await User.findOne({ email: email }, [
      "_id",
      "username",
      "email",
      "name",
      "profileImageURL",
      "fcmToken",
      "resetPasswordToken",
      "resetPasswordExpires"
    ]);
  } catch (error) {
    console.log("Utente non trovato:", error);
    res.status(400).json("An error has occured.");
    return;
  }

  if (!user) {
    console.log("Utente non trovato.");
    res.status(404).json("User not found.");
    return;
  }

  if (user.resetPasswordToken === token) {
    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        profileImageURL: user.profileImageURL
      },
      fcmToken: user.fcmToken
    });
  } else {
    console.log("Error.");
    res.status(400).json("Error.");
  }
});

module.exports = router;
