const router = require("express").Router();
const User = require("../../models/User");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./profile_images/");
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

    console.log(update);

    User.update({ username: req.params.username }, update)
      .then(data => res.json({ data }))
      .catch(error => res.json({ error }));
  }
);

module.exports = router;
