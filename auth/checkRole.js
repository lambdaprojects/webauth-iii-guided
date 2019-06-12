module.exports = function(role) {
  return function(req, res, next) {
    console.log(":::: REQ USER ROLE IS ::::" + req.user.role);
    if (req.user) {
      if (
        req.user.roles &&
        Array.isArray(req.user.roles) &&
        req.user.roles.includes(role)
      ) {
        next();
      } else {
        res.status(403).json({ message: "Can't touch this!" });
      }
    } else {
      res.status(401).json({ message: "You cannot pass!" });
    }
  };
};
