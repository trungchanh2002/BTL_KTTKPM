const rateLimit = require("express-rate-limit");

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

module.exports = limiter;
