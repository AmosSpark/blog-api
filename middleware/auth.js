const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  // validate
  if (!token) {
    return res.status(401).json("Access denied. No token provided.");
  } else {
    try {
      const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json("Invalid token.");
    }
  }
}

module.exports = auth;
