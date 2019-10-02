const router = require("express").Router();
const User = require("../../models/User");
const { loginValidation } = require("../../../validation/authvalidation");
const { api_link } = require("../../../utils/api");

// Gestione link '/login'
router.post("/", async (req, res) => {
  // 1. Controllo se ci sono errori di validazione dei dati.
  //    Si - Invio una risposta con status 422 e con messaggio di errore
  //    No - Continuo con l'esecuzione
  // 2. Cerco l'utente col nome inserito
  //    Se lo trovo - continuo con l'esecuzione
  //    Se non lo trovo - invio una riposta con status 404 e con messaggio di errore.
  // 3. Controllo se la password corrisponde con quella inserita
  //    Si - Invio una ripsota con status 200
  //    No - Invio una risposta con status 401

  const { error } = loginValidation(req.body);
  let user;

  if (error) {
    res.status(422).json({
      error: {
        title: "Errore di validazione",
        message: "Devi inserire delle credenziali valide.",
        code: 422
      },
      api: {
        href: `${api_link}/login`,
        method: "POST",
        body: ["username", "email", "password"]
      }
    });
  }

  try {
    user = await User.findOne().or([
      { email: req.body.email },
      { username: req.body.username }
    ]);
  } catch (err) {
    console.log("Errore durante il login:", err);
    res.status(500).json({
      error: {
        title: "Errore",
        message: "Errore durante il login.",
        code: 500
      },
      api: {
        href: `${api_link}/login`,
        method: "POST",
        body: ["username", "email", "password"]
      }
    });
  }

  if (!user) {
    res.status(404).json({
      error: {
        title: "Credenziali errate",
        message:
          "Non esiste nessun utente con questo nome utente o indirizzo email.",
        code: 404
      },
      api: {
        href: `${api_link}/login`,
        method: "POST",
        body: ["username", "email", "password"]
      }
    });
  }

  if (!user.isValidPassword(req.body.password)) {
    res.status(401).json({
      error: {
        title: "Credenziali errate",
        message: "Password errata.",
        code: 401
      },
      api: {
        href: `${api_link}/login`,
        method: "POST",
        body: ["username", "email", "password"]
      }
    });
  }

  // if (user && user.isValidPassword(req.body.password)) {}
  res.status(200).json({
    api: {
      href: `${api_link}/login`,
      method: "POST",
      body: ["username", "email", "password"]
    },
    payload: { user: user.toAuthJSON() }
  });
});

module.exports = router;
