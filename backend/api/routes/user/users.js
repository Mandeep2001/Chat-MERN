const router = require("express").Router();
const User = require("../../models/User");
const { verifyAndSendResponse } = require("../verifyToken");
const { api_link } = require("../../../utils/api");

const compareMessages = (a, b) => {
  if (!a > 0 || !a > 0) return 0;

  const aCreatedAt = a.createdAt;
  const bCreatedAt = b.createdAt;

  let comparison = 0;

  if (aCreatedAt < bCreatedAt) {
    comparison = 1;
  } else if (aCreatedAt > bCreatedAt) {
    comparison = -1;
  }

  return comparison;
};

const compareUsers = (a, b) => {
  if (!a.lastMessage) return 1;
  if (!b.lastMessage) return -1;

  return new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt);
};

router.post("/", async (req, res) => {
  const { userID } = req.body;
  const users = [];
  let sent;
  let received = [];

  verifyAndSendResponse(req, res);

  User.find()
    .select(
      "_id username profileImageURL sentMessages receivedMessages name email fcmToken"
    )
    .populate([
      {
        path: "sentMessages",
        select:
          "_id senderUserID receiverUserID createdAt message isEliminated isVisualized",
        match: { isEliminated: false }
      },
      {
        path: "receivedMessages",
        select:
          "_id senderUserID receiverUserID createdAt message isEliminated isVisualized",
        match: { isEliminated: false }
      }
    ])
    .then(data => {
      data.forEach(user => {
        sent = user.sentMessages.filter(
          message =>
            message.receiverUserID.equals(userID) && !message.isEliminated
        );

        received = user.receivedMessages.filter(
          message =>
            message.senderUserID.equals(userID) && !message.isEliminated
        );

        const messages = [...sent, ...received];

        messages.sort(compareMessages);
        const lastMessage = messages[0];

        users.push({
          user: {
            _id: user._id,
            username: user.username,
            profileImageURL: user.profileImageURL,
            fcmToken: user.fcmToken
          },
          messages,
          lastMessage
        });
      });

      users.sort(compareUsers);
      users.forEach(u =>
        u.lastMessage
          ? console.log(
              "Sorted:",
              u.user.username,
              " Last message:",
              new Date(u.lastMessage.createdAt).toUTCString()
            )
          : console.log("Sorted:", u.user.username)
      );
      res.json({ users });
    })
    .catch(error => {
      console.log("Errore in getUsers:", error);
      res.json({ error });
    });
});

module.exports = router;
