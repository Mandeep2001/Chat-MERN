const Message = require("../api/models/Message");
const User = require("../api/models/User");

const saveMessage = data => {
  const message = new Message({
    message: data.message,
    senderUserID: data.senderUserID,
    receiverUserID: data.receiverUserID
  });

  return new Promise((resolve, reject) => {
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
      .then(() => {
        resolve(message);
      })
      .catch(error => {
        console.log("Errore nel metodo messages/saveMessage:", error);
      });
  });
};

const setEliminateMessage = message => {
  return Message.updateOne({ _id: message._id }, { isEliminated: true });
};

module.exports = { saveMessage, setEliminateMessage };
