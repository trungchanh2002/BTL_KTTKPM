const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const httpProxy = require("http-proxy");
const bodyParser = require("body-parser");
const middleware = require("./middleware/middlewareController.js");
const proxy = httpProxy.createProxyServer();
const breaker = require("./circuitBreaker/circuitBreaker.js");
const limiter = require("./rateLimiter/rateLimiter.js");
const ip = process.env.IP;
const port = process.env.PORT;

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

app.use(
  "/service1",
  limiter.clientLimiter,
  middleware.verifyToken,
  (req, res) => {
    proxy.web(req, res, { target: process.env.PASSENGERS_URL }, (err) =>
      handleProxyError(err, req, res, process.env.PASSENGERS_URL)
    );
  }
);

app.use("/service2", middleware.verifyToken, (req, res) => {
  breaker
    .fire(req, res)
    .then(() => {
      if (!res.headersSent) {
        res.end();
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      if (!res.headersSent) {
        res.status(500).json({ message: "Service đạng tạm đóng trong 10s!" });
      }
    });
});

app.use("/service3", middleware.verifyToken, (req, res) => {
  proxy.web(req, res, { target: process.env.DRIVERS_URL }, (err) =>
    handleProxyError(err, req, res, process.env.DRIVERS_URL)
  );
});
app.use("/service4", middleware.verifyToken, (req, res) => {
  proxy.web(req, res, { target: process.env.ROUTES_URL }, (err) =>
    handleProxyError(err, req, res, process.env.ROUTES_URL)
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
