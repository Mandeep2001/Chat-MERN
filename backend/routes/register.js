const router = require("express").Router();
const User = require("../modules/User");
const bcrypt = require("bcryptjs");
const { registerValidation } = require("../validation/authvalidation");

// Gestione link '/register'
router.post("/", async (req, res) => {
  // Data validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user already exists in database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("E-mail already exists.");

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
    res.send(savedUser.id);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
