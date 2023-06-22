const jwt = require("jsonwebtoken");
const config = require("../config");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ message: "Token not found" });

  jwt.verify(token, config.secretTokenKey, (err, user) => {
    console.log(err);

    if (err) return res.status(403).json({ message: "Token is incorrect" });
    req.user = user;

    next();
  });
}
module.exports = authenticateToken;
