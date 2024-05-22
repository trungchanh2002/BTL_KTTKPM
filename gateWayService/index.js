const express = require("express");
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const cookieParser = require("cookie-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const rateLimit = require("express-rate-limit");
const middleware = require("./middleware/middlewareController");
const getaWayController = require("./Controller/getaWayController");
const ip = process.env.IP;
const port = process.env.PORT;
const mongodb = process.env.MONGODB;

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

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

//
app.use("/service0/login", getaWayController.login);
app.use("/service0/signup", getaWayController.signup);
app.use(
  "/service1",
  limiter,
  middleware.verifyToken,
  middleware.restrictAccess,
  createProxyMiddleware({
    target: "http://localhost:3001/api/v1/passengers",
    changeOrigin: true,
    pathRewrite: {
      "^/service1": "",
    },
  })
);
app.use(
  "/service2",
  middleware.verifyToken,
  createProxyMiddleware({ target: "http://localhost:3002", changeOrigin: true })
);
app.use(
  "/service3",
  middleware.verifyToken,
  createProxyMiddleware({ target: "http://localhost:3003", changeOrigin: true })
);
app.use(
  "/service4",
  middleware.verifyToken,
  createProxyMiddleware({ target: "http://localhost:3004", changeOrigin: true })
);
app.use(
  "/service5",
  middleware.verifyToken,
  createProxyMiddleware({ target: "http://localhost:3005", changeOrigin: true })
);

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}/`);
});
