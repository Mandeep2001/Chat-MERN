const express = require("express");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Message = require("./api/models/Message");
const { saveMessage, setEliminateMessage } = require("./utils/messages");
const { findSocketById } = require("./utils/api");

// Routes
const loginRoute = require("./api/routes/user/login");
const registerRoute = require("./api/routes/user/register");
const userProfileRoute = require("./api/routes/user/userProfile");
const usersRoute = require("./api/routes/user/users");
const messagesRoute = require("./api/routes/messages");

// Dotenv
dotenv.config();

// Connection with database
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connesso al database.");
});

// Middlewares
app.use(express.json());
app.use("/profile_images", express.static("./profile_images"));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
mongoose.set("useCreateIndex", true);

// Socket.io server
const nsp = io.of("/");
const users = {};

// When a client connets to the server
nsp.on("connection", socket => {
  // When a client fires the 'new_user' event
  socket.on("new_user", data => {
    users[data._id] = socket;

    socket.broadcast.emit("user_online", { user: data });
  });

  // When a client want to send a message
  socket.on("send_message", data => {
    // Get the socket that must receive the message
    let receiverSocket = null;

    receiverSocket = users[data.receiverUserID];

    // Save message in database
    saveMessage(data).then(res => {
      // Send message to the receiver
      if (receiverSocket) {
        receiverSocket.emit("message", res);
      }
      socket.emit("sentMessageID", {
        res,
        temporaryId: data._id,
        receiverUserID: res.receiverUserID
      });
    });
  });

  socket.on("visualize", async ({ sender, receiver }) => {
    try {
      await Message.updateMany(
        { senderUserID: receiver._id },
        { isVisualized: true }
      );
    } catch (error) {
      console.log("errore:", error);
    }

    let receiverSocket = null;

    receiverSocket = findSocketById(users, receiver._id);

    // for (const id in users) {
    //   if (id === receiver._id) {
    //     receiverSocket = users[id];
    //   }
    // }

    if (receiverSocket) {
      receiverSocket.emit("visualize", {
        sender: sender._id,
        receiver: receiver._id
      });
    }
  });

  socket.on("delete_message", data =>
    setEliminateMessage(data)
      .then(() => {
        let receiverSocket;

        for (const id in users) {
          if (id === data.receiverUserID) receiverSocket = users[id];
        }

        if (!receiverSocket) {
          console.log(
            "Il socket cercato non è stato trovato dalla funzione getSocketById, forse non è online al momento"
          );
          return;
        }
        receiverSocket.emit("delete_message", data);
      })
      .catch(error =>
        console.log("Errore durante l'eliminazione del messaggio:", error)
      )
  );

  // socket.on("disconnect", () => console.log("Disconnesso:", socket.user));
});

// Route Midllewares
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/signup", registerRoute);
app.use("/users", usersRoute);
app.use("/messages", messagesRoute);
app.use("/", userProfileRoute);

server.listen(process.env.PORT || 5000, () =>
  console.log("Socket.io server avviato. In ascolto sulla porta 5000.")
);
