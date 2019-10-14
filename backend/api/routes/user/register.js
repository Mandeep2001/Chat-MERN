const router = require("express").Router();
const emailValidator = require("email-validator");
const User = require("../../models/User");
const { registerValidation } = require("../../../validation/authvalidation");
const { api_link, API_LINK } = require("../../../utils/api");

// Gestione link '/signup'
router.post("/", async (req, res) => {
  const { email, username, password, name } = req.body;

  const { error } = registerValidation(req.body);

  if (error) {
    res.status(422).json({
      error: {
        title: "Errore di validazione",
        message: "Devi inserire delle credenziali valide.",
        code: 422
      },
      api: {
        href: `${api_link}/register`,
        method: "POST",
        body: ["username", "name", "email", "password"]
      }
    });
    return;
  }

  // Check if the username already exists in database
  let usernameExist;
  try {
    usernameExist = await User.findOne({ username });
  } catch (error) {
    console.log("Errore durante usernameExist:", error);
  }
  if (usernameExist) {
    res.status(409).json({
      error: {
        title: "Errore durante la registrazione",
        message: "Questo nome utente è già in uso.",
        code: 409
      },
      api: {
        href: `${api_link}/register`,
        method: "POST",
        body: ["username", "name", "email", "password"]
      }
    });
    return;
  }

  // Check if the e-mail already exists in database
  let emailExist;
  try {
    emailExist = await User.findOne({ email });
  } catch (error) {
    console.log("Errore durante emailExist:", error);
  }
  if (emailExist) {
    res.status(409).json({
      error: {
        title: "Errore durante la registrazione",
        message: "Questo indirizzo e-mail è già in uso.",
        code: 409
      },
      api: {
        href: `${api_link}/register`,
        method: "POST",
        body: ["username", "name", "email", "password"]
      }
    });
    return;
  }

  const user = new User({ email, username, name });
  user.setPassword(password);
  user
    .save()
    .then(() => {
      res.status(200).json({
        api: {
          href: `${api_link}/register`,
          method: "POST",
          body: ["username", "name", "email", "password"]
        },
        payload: { user: user.toAuthJSON() }
      });
    })
    .catch(() => {
      res.status(500).json({
        error: {
          title: "Errore durante la registrazione",
          message: "Errore interno al server.",
          code: 500
        },
        api: {
          href: `${api_link}/register`,
          method: "POST",
          body: ["username", "name", "email", "password"]
        }
      });
    });
});

router.post("/check_email", async (req, res) => {
  let user = null;
  const { email } = req.body;

  if (!email) {
    res.status(400).json({
      error: {
        message: "Devi inserire un indirizzo e-mail."
      },
      api: {
        href: `${API_LINK}${req.baseUrl}`,
        method: req.method,
        body: ["email"]
      }
    });
  }

  if (!emailValidator.validate(email)) {
    res.status(400).json({
      error: {
        message: "Indirizzo e-mail non valido."
      },
      api: {
        href: `${API_LINK}${req.baseUrl}`,
        method: req.method,
        body: ["email"]
      }
    });
  }

  try {
    user = await User.findOne({ email });
  } catch (error) {
    console.error("Errore:", error);
  }

  if (!user) {
    res.status(422).json({
      error: { message: "Indirizzo e-mail già in uso." },
      api: {
        href: `${API_LINK}${req.baseUrl}`,
        method: req.method,
        body: ["email"]
      }
    });
  }

  res.status(200).json({
    payload: { message: "E-mail libera." },
    api: {
      href: `${API_LINK}${req.baseUrl}`,
      method: req.method,
      body: ["email"]
    }
  });
});

module.exports = router;
