const router = require("express").Router();
const User = require("../../models/User");

router.post("/", (req, res) => {
  const userID = req.body.userID;
  let users = [];
  let sent,
    received = [];

  User.find()
    .select("_id username profileImageURL sentMessages receivedMessages")
    .populate([
      {
        path: "sentMessages",
        select: "_id senderUserID receiverUserID createdAt message"
      },
      {
        path: "receivedMessages",
        select: "_id senderUserID receiverUserID createdAt message"
      }
    ])
    .then(data => {
      data.forEach(user => {
        sent = user.sentMessages.filter(message =>
          message.receiverUserID.equals(userID)
        );

        received = user.receivedMessages.filter(message =>
          message.senderUserID.equals(userID)
        );

        const messages = [...sent, ...received];

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
