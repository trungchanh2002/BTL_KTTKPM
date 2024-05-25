const express = require("express");
const app = express();
const axios = require("axios");
require("dotenv").config();

const ip = process.env.IP;
const port = process.env.PORT;

// Hàm delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// Hàm gọi API với cơ chế retry
const callApiWithRetry = async (url, options, retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios(url, options);
      return response.data; // Nếu thành công, trả về dữ liệu
    } catch (error) {
      if (i === retries - 1) {
        console.log(`Đã thử lại ${retries} lần và không thành công!`);
        throw error; // Ném lỗi nếu đã thử đủ số lần mà vẫn không thành công
      }
      const waitTime = 3000; // Tăng thời gian chờ lên sau mỗi lần thử lại
      console.log(`Đang thử lại lần ${i + 1} sau 3 giây...`);
      await delay(waitTime);
    }
  }
};
// Middleware để áp dụng retry cho tất cả các API từ gateway
app.use(async (req, res, next) => {
  const gatewayUrl = `http://${ip}:3000` + req.url;
  console.log(`Retry: ${gatewayUrl}`);
  const options = {
    method: req.method,
    headers: req.headers,
    data: req.body,
  };
  try {
    const data = await callApiWithRetry(gatewayUrl, options);
    res.json(data);
    console.log("Lấy dữ liệu thành công!");
  } catch (error) {
    res.status(500).json({ error: "Lấy dữ liệu không thành công!" });
  }
});

// Endpoint mặc định
app.get("/", (req, res) => {
  res.send("Retry API is running");
});

app.listen(port, () => {
  console.log(`Server is running on: ${ip}:${port}`);
});
