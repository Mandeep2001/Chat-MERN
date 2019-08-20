const router = require("express").Router();
const User = require("../models/User");
const Message = require("../models/Message");

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

router.get("/messages", (req, res) => {
  const userID = req.query.userID;
  Message.find()
    .or([{ senderUserID: userID }, { receiverUserID: userID }])
    .sort("+createdAt")
    .exec()
    .then(data => {
      res.json({ messages: data });
    });
});

router.post("/addMessage", (req, res) => {
  const message = new Message({
    message: req.body.message,
    senderUserID: req.body.senderUserID,
    receiverUserID: req.body.receiverUserID
  });
  message.save().then(data => res.json({ message: "Inserito", data }));
});

module.exports = router;
