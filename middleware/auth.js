const jwt = require("jsonwebtoken");

module.exports = () => {
  return (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      req.isAuth = false;
      return next();
    }

    const token = authHeader.split(" ")[1];
    if (!token || token === "") {
      req.isAuth = false;
      return next();
    }

    let decodeToken;

    try {
      decodeToken = jwt.verify(token, "secretkey");
    } catch (err) {
      req.isAuth = false;
      return next();
    }

    if (!decodeToken) {
      req.isAuth = false;
      return next();
    }

    req.isAuth = true;
    req.userId = decodeToken.userId;
    req.email = decodeToken.email;
    next();
  };
};
