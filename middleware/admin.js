const admin = function (req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).json("Acess denied");
  } else {
    next();
  }
};

module.exports = admin;
