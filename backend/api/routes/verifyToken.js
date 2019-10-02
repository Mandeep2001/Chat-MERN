const jwt = require("jsonwebtoken");
const { api_link } = require("../../utils/api");

const verify = async token => {
  try {
    const res = jwt.verify(token, process.env.TOKEN_SECRET);
    return res;
  } catch (error) {
    return error;
  }
};

const verifyAndSendResponse = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({
      error: { message: "Authorization token is required.", code: 401 },
      api: { href: `${api_link}/users`, method: "POST", body: ["_id"] }
    });
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    res.status(401).json({
      error: { message: "Invalid authorization token.", code: 401 },
      api: { href: `${api_link}/users`, method: "POST", body: ["_id"] }
    });
  }
};

module.exports = { verify, verifyAndSendResponse };
