const router = require("express").Router();
const User = require("../models/User");

// Gestione link '/api/users'
router.get("/users", (req, res) => {
  const users = [];

  User.find()
    .then(data => {
      data.forEach(({ _id, username, name, profileImageURL }) => {
        users.push({ _id, username, name, profileImageURL });
      });
      res.json(users);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

module.exports = router;
