const router = require("express").Router();
const User = require("../modules/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginValidation } = require("../validation/authvalidation");

// Gestione link '/login'
router.post("/", async (req, res) => {
  // TODO: Fare una migliore gestione della risposta, inviarne una unica con gli errori sia dell'e-mail sia della password.

  // Data validation
  const { error } = loginValidation(req.body);
  if (error)
    return res.send({ isSuccess: false, error: error.details[0].message });

  // Check if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send({ isSuccess: false, error: "E-mail is wrong." });

  // Check if the password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.json({ isSuccess: false, error: "Invalid password." });

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
