const router = require("express").Router();
const User = require("../../models/User");

// GET /users
router.get("/", (req, res) => {
  User.find()
    .populate("sentMessages receivedMessages")
    .exec()
    .then(data => res.json({ users: data }))
    .catch(error => res.status(400).json(error));
});

module.exports = router;
