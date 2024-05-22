const jwt = require("jsonwebtoken");
require("dotenv").config();

const middleware = {
  // Middleware kiểm tra token
  verifyToken: (req, res, next) => {
    const token = req.cookies["accessToken"];
    if (!token) {
      return res.status(401).json({ error: "Bạn cần Login" });
    }
    try {
      jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({ error: "Bạn không có quyền" });
        }
        req.user = user;
        next();
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Invalid Token" });
    }
  },
  // Middleware kiểm tra quyền truy cập Passengers
  restrictAccess: (req, res, next) => {
    const allowedPaths = ["/getAllPassengers", "/getPassengerById"];
    const requestPath = req.path;
    const isGetPassengerById = requestPath.startsWith("/getPassengerById");
    if (allowedPaths.includes(requestPath) || isGetPassengerById) {
      next();
    } else {
      res.status(403).json({ error: "Bạn không có quyền truy cập" });
    }
  },
};

module.exports = middleware;
