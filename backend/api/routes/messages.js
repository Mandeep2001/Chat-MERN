const router = require("express").Router();
const User = require("../models/User");
const Message = require("../models/Message");

// GET /messages
router.get("/messages", (req, res) => {
  const userID = req.query.userID;

  Message.findOne()
    .or([{ senderUserID: userID }, { receiverUserID: userID }])
    .populate("senderUserID receiverUserID")
    .sort("+createdAt")
    .exec()
    .then(data => res.json({ messages: data }));
});

// POST /messages
router.post("/", (req, res) => {
  // Creo il messaggio
  const message = new Message({
    message: req.body.message,
    senderUserID: req.body.senderUserID,
    receiverUserID: req.body.receiverUserID
  });

  // Salvo il messaggio
  message
    .save()
    .then(message => {
      // Ritorno il mittente
      return User.findById(message.senderUserID);
    })
    .then(senderUser => {
      // Aggiungo il messaggio ai messaggi inviati del mittente
      senderUser.sentMessages.push(message._id);
      return senderUser.save();
    })
    .then(() => {
      // Ritorno il destinatario
      return User.findById(message.receiverUserID);
    })
    .then(receiverUser => {
      // Aggiungo il messaggio ai messaggi ricevuti del ricevente
      receiverUser.receivedMessages.push(message._id);
      return receiverUser.save();
    })
    .then(res.json({ message: "Inserito" }))
    .catch(error => res.json({ error }));
});

module.exports = router;
