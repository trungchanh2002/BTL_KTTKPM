const rateLimit = require("express-rate-limit");

// Rate limiter cho phía client
const clientLimiter = rateLimit({
  windowMs: 10 * 1000, // Thời gian khóa
  max: 3, // Số lần thử
  message: "Bạn đã thử quá nhiều lần, thử lại sau 10 giây",
});

// Rate limiter cho phía server
const serverLimiter = rateLimit({
  windowMs: 10 * 1000, // Thời gian khóa
  max: 5, // Số lần thử
  message: "Bạn đã thử quá nhiều lần, thử lại sau 10 giây",
  handler: (req, res) => {
    res.status(429).json({
      message: "Bạn đã thử quá nhiều lần, thử lại sau 10 giây",
    });
  },
});

module.exports = {
  clientLimiter,
  serverLimiter,
};
