const jwt = require("jsonwebtoken");

// function verify(req, res, next) {
//   const token = req.header("auth-token");

//   if (!token) return res.status(401).send("Access denied.");

//   try {
//     const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//     req.user = verified;
//   } catch (error) {
//     res.status(400).send("Invalid token");
//   }
// }

const verify = async (token) => {
  try {
    const res = jwt.verify(token, process.env.TOKEN_SECRET);
    return res;
  } catch (error) {
    console.log('Errore durante verifica jwtToken:', error);
    return error; 
  }
}

module.exports = verify;