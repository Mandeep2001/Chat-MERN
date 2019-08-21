const router = require("express").Router();
const User = require("../../models/User");

// GET /users
// router.get("/", (req, res) => {
//   User.find()
//     .populate("sentMessages receivedMessages")
//     .exec()
//     .then(data => res.json({ users: data }))
//     .catch(error => res.status(400).json(error));
// });

router.post("/", (req, res) => {
  const userID = req.body.userID;
  let users = [];
  let sent,
    received = [];

  // {username: '', messaggi: []}

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

        messages.sort(function(a, b) {
          return a.plantingDate > b.plantingDate;
        });

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
