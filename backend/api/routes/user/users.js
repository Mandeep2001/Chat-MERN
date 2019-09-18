const router = require("express").Router();
const User = require("../../models/User");

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

router.post("/", (req, res) => {
  const userID = req.body.userID;
  let users = [];
  let sent,
    received = [];

  User.find()
    .select(
      "_id username profileImageURL sentMessages receivedMessages name email"
    )
    .populate([
      {
        path: "sentMessages",
        select: "_id senderUserID receiverUserID createdAt message isEliminated isVisualized",
        match: { isEliminated: false }
      },
      {
        path: "receivedMessages",
        select: "_id senderUserID receiverUserID createdAt message isEliminated isVisualized",
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

        users.push({
          user: {
            _id: user._id,
            username: user.username,
            profileImageURL: user.profileImageURL
          },
          messages
        });
      });
      res.json({ users });
    })
    .catch(error => res.json({ error }));
});

module.exports = router;
