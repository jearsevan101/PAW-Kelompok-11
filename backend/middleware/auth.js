const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if(!token) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(err) {
      return res.status(403).json({
        message: "Invalid token"
      });
    }
    req.user = user;
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  if(req.user.username !== "admin"){
    return res.status(401).json({message: "Unauthorized"});
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };
