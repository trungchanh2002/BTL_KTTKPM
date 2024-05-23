const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const httpProxy = require("http-proxy");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const middleware = require("./middleware/middlewareController.js");
const proxy = httpProxy.createProxyServer();
const ip = process.env.IP;
const port = process.env.PORT;

const limiter = rateLimit({
  windowMs: 10 * 1000, // Thời gian khóa
  max: 3, // Số lần thử
  message: "Bạn đã thử quá nhiều lần, thử lại sau 10 giây",
  handler: (req, res) => {
    res.status(429).json({
      message: "Bạn đã thử quá nhiều lần, thử lại sau 10 giây",
    });
  },
});

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Proxy error handling
const handleProxyError = (err, req, res, target) => {
  console.error(`Error forwarding request to ${target}: ${err.message}`);
  res.status(500).send("Internal Server Error");
};

app.use("/service1", limiter, middleware.verifyToken, (req, res) => {
  proxy.web(req, res, { target: process.env.PASSENGERS_URL }, (err) =>
    handleProxyError(err, req, res, process.env.PASSENGERS_URL)
  );
});
app.use("/service2", middleware.verifyToken, (req, res) => {
  proxy.web(req, res, { target: process.env.BUSES_URL }, (err) =>
    handleProxyError(err, req, res, process.env.BUSES_URL)
  );
});
app.use("/service3", middleware.verifyToken, (req, res) => {
  proxy.web(req, res, { target: process.env.DRIVERS_URL }, (err) =>
    handleProxyError(err, req, res, process.env.DRIVERS_URL)
  );
});
app.use("/service4", middleware.verifyToken, (req, res) => {
  proxy.web(req, res, { target: process.env.ROUTES }, (err) =>
    handleProxyError(err, req, res, process.env.ROUTES)
  );
});
app.use("/service5", middleware.verifyToken, (req, res) => {
  proxy.web(req, res, { target: process.env.TICKETS_URL }, (err) =>
    handleProxyError(err, req, res, process.env.TICKETS_URL)
  );
});

app.listen(port, () => {
  console.log(`Server is running on: ${ip}:${port}`);
});
