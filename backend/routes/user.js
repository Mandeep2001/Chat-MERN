const router = require("express").Router();
const User = require("../modules/User");

// Gestione link '/'
router.get("/:username", (req, res) => {
  const username = req.params.username;

  User.findOne({ username }, (err, user) => {
    if (err) res.status(400).send("An error has occured: " + err);
    res.send(user);
  });
});

module.exports = router;
