const express = require("express");
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const cookieParser = require("cookie-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

// import environment variables
const ip = process.env.IP;
const port = process.env.PORT;
const mongodb = process.env.MONGODB_URI;

const middleware = require("./middleware/middlewareController");
const getaWayController = require("./Controller/getaWayController");
const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(cors());

//
app.use("/service0/login", getaWayController.login);
app.use("/service0/signup", getaWayController.signup);

app.use(
  "/service1",
  middleware.verifyToken,
  createProxyMiddleware({ target: "http://localhost:3001", changeOrigin: true })
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
  console.log(`Server running on: http://${ip}:${port}/service0/login`);
});
