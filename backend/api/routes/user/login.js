const router = require("express").Router();
const User = require("../../models/User");
// const jwt = require("jsonwebtoken");
const { loginValidation } = require("../../../validation/authvalidation");

// Gestione link '/login'
router.post("/", (req, res) => {

  // Data validation
  const { error } = loginValidation(req.body);
  // Se ci sono errori
  if (error) {
    return res.send({
      error: error.details[0].message
    });
  }

  // Cerco un utente
  User.findOne().or([{ email: req.body.email }, { username: req.body.username }]).then(user => {
    // Se l'utente esiste e la password è valida
    if (user && user.isValidPassword(req.body.password)) {
      res.json({ user: user.toAuthJSON() });
    } else {
      res.json({
        error: "Credenziali errate."
      });
    }
  });
});

module.exports = router;
