const { RateLimiterMemory } = require("rate-limiter-flexible");
const express = require("express");
const axios = require("axios");
const app = express();
const port = 3007;

const duration = 10; // 5 giây
const points = 1; // 1 request

// Tạo một instance rate limiter
const rateLimiter = new RateLimiterMemory({
  points: points,
  duration: duration,
});

// Hàm delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Hàm gọi API với rate limiter
const callApiWithRateLimiter = async (url, options) => {
  try {
    await rateLimiter.consume("api", 1);
    const response = await axios(url, options);
    return response.data;
  } catch (rateLimiterRes) {
    if (rateLimiterRes instanceof Error) {
      throw rateLimiterRes; // Nếu là lỗi thực sự, ném lỗi
    } else {
      const retrySecs = rateLimiterRes.msBeforeNext / 1000; // Thời gian chờ trước khi thử lại tính bằng giây
      console.log(`Thử lại sau ${retrySecs} giây.`);
      await delay(retrySecs * 1000); // Chờ trước khi thử lại
      return callApiWithRateLimiter(url, options); // Thử lại gọi API
    }
  }
};

// Endpoint lấy dữ liệu hành khách với rate limiter
app.get("/getAllPassengersRateLimited", async (req, res) => {
  const url = "http://localhost:3001/api/v1/passengers/getAllPassengers";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const data = await callApiWithRateLimiter(url, options);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Lấy dữ liệu thất bại!" });
  }
});

// Endpoint mặc định
app.get("/", (req, res) => {
  res.send("API giới hạn tốc độ đang chạy");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Rate limiter: Giới hạn ${points} requests mỗi ${duration} giây`);
});
