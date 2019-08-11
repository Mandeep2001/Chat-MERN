const router = require("express").Router();
const User = require("../modules/User");
const bcrypt = require("bcryptjs");
const { registerValidation } = require("../validation/authvalidation");

// Gestione link '/register'
router.post("/", async (req, res) => {
  // Data validation
  const { error } = registerValidation(req.body);
  if (error)
    return res.send({
      isSuccess: false,
      error: "L'indirizzo e-mail che hai inserito non esiste."
    });

  // Check if the e-mail already exists in database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.send({
      isSuccess: false,
      error: "L'indirizzo e-mail che hai inserito già esiste."
    });

  // Check if the username already exists in database
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist)
    return res.send({
      isSuccess: false,
      error: "Il nome utente che hai inserito già esiste."
    });

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashPassword,
    email: req.body.email,
    name: req.body.name
  });
  try {
    const savedUser = await user.save();
    console.log(savedUser);
    res.send({
      isSuccess: true,
      id: savedUser._id
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
