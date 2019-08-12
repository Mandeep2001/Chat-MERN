const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginValidation } = require("../validation/authvalidation");

// Gestione link '/login'
router.post("/", async (req, res) => {
  // Data validation
  const { error } = loginValidation(req.body);
  if (error) {
    return res.send({
      isSuccess: false,
      error: error.details[0].message
    });
  }

  // User.findOne({ email: req.body.email }).then(user => {
  //   if (user) {
  //   } else {
  //     res.status(400).json({
  //       isSuccess: false,
  //       error: "La password è errata."
  //     });
  //   }
  // });

  // Check if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.send({
      isSuccess: false,
      error: "L'indirizzo e-mail che hai inserito non esiste."
    });

  // Check if the password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.json({
      isSuccess: false,
      error: "La password è errata."
    });

  // Create jwt token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send({
    isSuccess: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name
    }
  });
});

module.exports = router;
