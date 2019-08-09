const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Routes
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const userRoute = require("./routes/user");

const app = express();

// Dotenv
dotenv.config();

// Connection with database
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connesso al database.");
});

// Middlewares
app.use(express.json());

// Route Midllewares
app.use("/", userRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.listen(5000, () => console.log("Server avviato."));
