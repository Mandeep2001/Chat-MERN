const router = require("express").Router();
const User = require("../../models/User");
const multer = require("multer");
const userUtils = require("../../../utils/user");

const FINDONEANDUPDATE_CONFIG = { useFindAndModify: false, new: true };

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./profile_images");
  },
  filename: (req, file, cb) => {
    const path =
      new Date().toDateString() + req.params.username + file.originalname;
    cb(null, path);
  }
});

const upload = multer({ storage });

// GET /
router.get("/:username", (req, res) => {
  const username = req.params.username;

  User.findOne({ username }, (err, user) => {
    if (err) res.status(400).send("An error has occured: " + err);
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

router.patch("/:username/update_info", (req, res) => {
  const updateArray = Object.keys(req.body);
  let update = {};

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

  console.log(update);

  User.findOneAndUpdate(
    { username: req.params.username },
    update,
    FINDONEANDUPDATE_CONFIG
  )
    .then(data =>
      res.json({ _id: data._id, username: data.username, email: data.email })
    )
    .catch(error => res.json({ error }));
});

router.patch(
  "/:username/update_profile_image",
  upload.single("image"),
  (req, res) => {
    let update;
    console.log("Ricevuto:", req.params.username, req.file);
    if (req.file) update = { profileImageURL: req.file.path };

    User.findOneAndUpdate({ username: req.params.username }, update)
      .then(data =>
        res.json({
          profileImageURL: data.profileImageURL,
          _id: data._id,
          username: data.username
        })
      )
      .catch(error => res.json({ error }));
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

module.exports = router;
