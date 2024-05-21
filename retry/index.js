const express = require("express");
const app = express();
const axios = require("axios");
const port = 3006;

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

// Endpoint lấy dữ liệu hành khách với cơ chế retry
app.get("/getAllPassengersRetry", async (req, res) => {
  const url = "http://localhost:3001/api/v1/passengers/getAllPassengers";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const data = await callApiWithRetry(url, options);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Lấy dữ liệu thất bại!" });
  }
});

// Endpoint mặc định
app.get("/", (req, res) => {
  res.send("Retry API is running");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Retry API is running`);
});
