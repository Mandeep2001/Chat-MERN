const router = require("express").Router();
const User = require("../models/User");
const Message = require("../models/Message");

// Gestione link '/api/users'
router.get("/users", (req, res) => {
  User.find()
    .populate("sentMessages receivedMessages")
    .exec()
    .then(data => res.json({ users: data }))
    .catch(error => res.status(400).json(error));
});

// Gestione link '/api/messages'
router.get("/messages", (req, res) => {
  const userID = req.query.userID;

  Message.findOne()
    .or([{ senderUserID: userID }, { receiverUserID: userID }])
    .populate("senderUserID receiverUserID")
    .sort("+createdAt")
    .exec()
    .then(data => res.json({ messages: data }));
});

// TODO: Cambiare sul client l'indirizzo da /addmessages a messages
router.post("/messages", (req, res) => {
  // 1. Salvare il messaggio
  const message = new Message({
    message: req.body.message,
    senderUserID: req.body.senderUserID,
    receiverUserID: req.body.receiverUserID
  });

  message
    .save()
    .then(message => {
      return User.findById(message.senderUserID);
    })
    .then(senderUser => {
      senderUser.sentMessages.push(message._id);
      return senderUser.save();
    })
    .then(() => {
      return User.findById(message.receiverUserID);
    })
    .then(receiverUser => {
      receiverUser.receivedMessages.push(message._id);
      return receiverUser.save();
    })
    .then(res.json({ message: "Inserito" }))
    .catch(error => res.json({ error }));
});

module.exports = router;
