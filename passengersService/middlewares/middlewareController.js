const jwt = require("jsonwebtoken");
require("dotenv").config();

const middleware = {
  verifyToken: (req, res, next) => {
    let token = req.cookies["accessToken"];
    if (!token) {
      return res.status(401).json({ error: "Bạn cần Login." });
    }
    try {
      if (token === undefined) {
        token = req.headers["authorization"];
        console.log(token);
        token = token.split(" ")[1];
      }

      jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, passenger) => {
        if (err) {
          return res.status(403).json({ error: "Bạn không có quyền" });
        }
        req.passenger = passenger;
        next();
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Invalid Token" });
    }
  },

  verifyTokenAuth: (req, res, next) => {
    let token = req.cookies["accessToken"];
    if (!token) {
      return res.status(401).json({ error: "Bạn cần Login." });
    }
    try {
      if (token === undefined) {
        token = req.headers["authorization"];
        console.log(token);
        token = token.split(" ")[1];
      }

      jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, passenger) => {
        if (err) {
          return res.status(403).json({ error: "Bạn không có quyền" });
        }
        req.passenger = passenger;
        if (passenger.role !== "admin") {
          return res.status(403).json({ error: "Bạn không có quyền admin" });
        }
        next();
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Invalid Token" });
    }
  },

  verifyTokenUser: (req, res, next) => {
    let token = req.cookies["accessToken"];
    if (!token) {
      return res.status(401).json({ error: "Bạn cần Login." });
    }
    try {
      if (token === undefined) {
        token = req.headers["authorization"];
        console.log(token);
        token = token.split(" ")[1];
      }

      jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, passenger) => {
        if (err) {
          return res.status(403).json({ error: "Bạn không có quyền" });
        }
        req.passenger = passenger;
        if (passenger.role !== "user") {
          return res.status(403).json({ error: "Bạn không có quyền user" });
        }
        next();
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Invalid Token" });
    }
  },
};

module.exports = middleware;
