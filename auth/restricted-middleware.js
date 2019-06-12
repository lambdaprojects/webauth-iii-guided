const jwt = require("jsonwebtoken");

const secrets = require("../config/secrets.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(":::::AUTHORIZATION::" + token);
  if (token) {
    jwt.verify(token, secrets.jwtsecret, (err, decodeToken) => {
      if (err) {
        //invalid token
        console.log(":::::::ERROR ::::::::" + err);
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        //valid token
        req.user = { roles: decodeToken.roles, username: decodeToken.username };
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No token provided" });
  }
};
