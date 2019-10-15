const router = require("express").Router();
const emailValidator = require("email-validator");
const User = require("../../models/User");
const { registerValidation } = require("../../../validation/authvalidation");
const {
  API_LINK,
  getResponseApi,
  getResponseError,
  getResponseSuccess
} = require("../../../utils/api");
const { checkIfExists } = require("../../../utils/user");
const {
  validateEmail,
  validateUsername,
  validatePassword
} = require("../../../utils/validation");

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
      api: getResponseApi(req, ["email, username", "password", "name"])
    });
    return;
  }

  // Check if the username already exists in database
  let usernameExist;
  try {
    usernameExist = await User.findOne({ username });
  } catch (err) {
    console.log("Errore durante usernameExist:", err);
  }
  if (usernameExist) {
    res.status(409).json({
      error: {
        title: "Errore durante la registrazione",
        message: "Questo nome utente è già in uso.",
        code: 409
      },
      api: getResponseApi(req, ["email, username", "password", "name"])
    });
    return;
  }

  // Check if the e-mail already exists in database
  let emailExist;
  try {
    emailExist = await User.findOne({ email });
  } catch (err) {
    console.log("Errore durante emailExist:", err);
  }
  if (emailExist) {
    res.status(409).json({
      error: {
        title: "Errore durante la registrazione",
        message: "Questo indirizzo e-mail è già in uso.",
        code: 409
      },
      api: getResponseApi(req, ["email, username", "password", "name"])
    });
    return;
  }

  const user = new User({ email, username, name });
  user.setPassword(password);
  user
    .save()
    .then(() => {
      res.status(200).json({
        api: getResponseApi(req, ["email, username", "password", "name"]),
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
        api: getResponseApi(req, ["email, username", "password", "name"])
      });
    });
});

router.post("/v2", async (req, res) => {
  const { username, email, password } = req.body;

  let errors = { email: null, username: null, password: null };

  if (validateEmail(email)) errors = { ...errors, email: validateEmail(email) };
  if (validateUsername(username))
    errors = { ...errors, username: validateUsername(username) };
  if (validatePassword(password))
    errors = { ...errors, password: validatePassword(password) };

  const emailExist = await checkIfExists("email", email);
  const usernameExist = await checkIfExists("username", username);

  if (emailExist)
    errors = { ...errors, email: "Questo indirizzo e-mail è gia in uso." };
  if (usernameExist)
    errors = { ...errors, username: "Questo nome utente è già in uso." };

  if (errors.email || errors.username || errors.password) {
    res.status(422).json(
      getResponseError(req, ["username", "email", "password"], {
        ...errors,
        code: 422
      })
    );
    return;
  }

  const user = new User({ email, username });
  user.setPassword(password);
  user
    .save()
    .then(() => {
      res.status(200).json(
        getResponseSuccess(req, ["email", "username", "password"], {
          user: user.toAuthJSON()
        })
      );
    })
    .catch(errore => {
      console.log("Errore:", errore);
      res.status(500).json(
        getResponseError(req, ["email", "username", "password"], {
          message: "Si è verificato un errore.",
          code: 500
        })
      );
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
    return;
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
    return;
  }

  try {
    user = await User.findOne({ email });
  } catch (error) {
    console.error("Errore:", error);
  }

  if (user) {
    res.status(422).json({
      error: { message: "Indirizzo e-mail già in uso." },
      api: {
        href: `${API_LINK}${req.baseUrl}`,
        method: req.method,
        body: ["email"]
      }
    });
    return;
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

router.post("/check_username", async (req, res) => {
  let user = null;
  const { username } = req.body;

  if (!username) {
    res.status(400).json({
      error: {
        message: "Devi inserire un nome utente."
      },
      api: getResponseApi(req, ["username"])
    });
    return;
  }

  if (username.length < 3) {
    res.status(400).json({
      error: {
        message: "Il nome utente deve contenere almeno 3 caratteri."
      },
      api: getResponseApi(req, ["username"])
    });
    return;
  }

  try {
    user = await User.findOne({ username });
  } catch (error) {
    console.error("Errore:", error);
  }

  if (user) {
    res.status(422).json({
      error: { message: "Nome utente già in uso." },
      api: getResponseApi(req, ["username"])
    });
    return;
  }

  res.status(200).json({
    payload: { message: "Nome utente disponibile." },
    api: getResponseApi(req, ["username"])
  });
});
module.exports = router;
