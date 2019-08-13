const router = require("express").Router();
const User = require("../models/User");
// const bcrypt = require("bcrypt");
const { registerValidation } = require("../validation/authvalidation");

// Gestione link '/register'
router.post("/", async (req, res) => {
  const { email, username, password, name } = req.body;
  // Data validation
  const { error } = registerValidation(req.body);
  if (error) {
    return res.send({
      error: error.details[0].message
    });
  }

  // Check if the username already exists in database
  const usernameExist = await User.findOne({ username });
  if (usernameExist)
    return res.json({
      error: "Il nome utente inserito già esiste."
    });

  // Check if the e-mail already exists in database
  const emailExist = await User.findOne({ email });
  if (emailExist)
    return res.json({
      error: "L'indirizzo e-mail inserito già esiste."
    });

  const user = new User({ email, username, name });
  user.setPassword(password);
  user
    .save()
    .then(res.json({ user: user.toAuthJSON() }))
    .catch(error => res.json({ error }));

  // Check if the e-mail already exists in database

  // Hash the password
  // const salt = bcrypt.genSalt(10);
  // const hashPassword = bcrypt.hash(req.body.password, salt);

  // const user = new User({
  //   username: req.body.username,
  //   password: hashPassword,
  //   email: req.body.email,
  //   name: req.body.name
  // });
  // try {
  //   const savedUser = user.save();
  //   res.send({
  //     isSuccess: true,
  //     id: savedUser._id
  //   });
  // } catch (error) {
  //   res.status(400).send(error);
  // }
});

module.exports = router;
