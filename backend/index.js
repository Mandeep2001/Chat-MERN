const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const saveMessage = require("./utils/messages");

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
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
mongoose.set("useCreateIndex", true);

// Socket.io server
const nsp = io.of("/");

nsp.on("connection", socket => {
  console.log("Connesso:", socket.id);

  socket.on("send_message", data => {
    console.log("Data received:", data);
    saveMessage(data)
      .then(res => console.log("Inserito messaggio:", res._id))
      .catch(error => console.log(error));
  });

  socket.on("disconnect", () => console.log("Disconnesso"));
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
