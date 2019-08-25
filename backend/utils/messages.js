const Message = require("../api/models/Message");
const User = require("../api/models/User");

const saveMessage = data => {
  const message = new Message({
    message: data.message,
    senderUserID: data.senderUserID,
    receiverUserID: data.receiverUserID
  });

  return message
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
    });
};

module.exports = saveMessage;
