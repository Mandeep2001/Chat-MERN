const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { saveMessage, getSocketById } = require("./utils/messages");

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

// When a client connets to the server
nsp.on("connection", socket => {
  // When a client fires the 'new_user' event
  socket.on("new_user", data => (socket.user = data));

  // When a client want to send a message
  socket.on("send_message", data => {
    // Get the socket that must receive the message
    const receiverSocket = getSocketById(data.receiverUserID, io);
    if (!receiverSocket) {
      console.log(
        "Il socket cercato non è stato trovato dalla funzione getSocketById, forse non è online al momento"
      );
      return;
    }
    // Save message in database
    saveMessage(data).then(res => {
      // Send message to the receiver
      receiverSocket.emit("message", res);
    });
  });

  // socket.on("disconnect", () => console.log("Disconnesso:", socket.user));
});

// Route Midllewares
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/users", usersRoute);
app.use("/messages", messagesRoute);
app.use("/", userProfileRoute);

server.listen(5000, () =>
  console.log("Socket.io server avviato. In ascolto sulla porta 5000.")
);
