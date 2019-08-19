const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Routes
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const userRoute = require("./routes/user");
const apiRoute = require("./routes/api");

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
io.on("connection", socket => {
  console.log("Connesso.");
});

// Route Midllewares
app.use("/", userRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/api", apiRoute);

server.listen(5000, () =>
  console.log("Socket.io server avviato. In ascolto sulla porta 5000.")
);
