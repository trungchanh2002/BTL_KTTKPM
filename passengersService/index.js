const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cookieParser = require("cookie-parser");

// import environment variables
const ip = process.env.IP;
const port = process.env.PORT;
const mongodb = process.env.MONGODB_URI;

// routes
const passengerRoutes = require("./routes/passengerRoutes");

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// database connection
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Connection failed:", error);
  });

// routes
app.use("/api/v1/passengers", passengerRoutes);
app.use(function (req, res) {
  res.status(404).send("Not found");
});

// Bắt đầu server và lắng nghe các kết nối tới
server.listen(port, ip, () => {
  console.log(`Server is running on: ${ip}:${port}`);
});
