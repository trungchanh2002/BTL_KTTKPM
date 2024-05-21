const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const requestData = {
      username: username,
      password: password,
    };
    const response = await axios.post(
      `http://localhost:3001/api/v1/passengers/login`,
      requestData
    );
    if (response.status === 200) {
      if (response.data) {
        const user = response.data;
        const accessToken = jwt.sign(
          {
            id: user._id,
            name: user.name,
            username: user.username,
          },
          process.env.JWT_ACCESS_KEY,
          { expiresIn: "1000s" }
        );
        // Thời gian sống là 24 giờ (24 * 60 * 60 * 1000)
        const maxAge = 86400000;
        res.cookie("accessToken", accessToken, { maxAge: maxAge });
        const { password, ...info } = user;
        return res.status(200).json({ ...info, accessToken });
      } else {
        return res
          .status(500)
          .json({ error: "User data is missing or invalid" });
      }
    } else {
      // Nếu không thành công, trả về lỗi từ server khác
      return res.status(response.status).json(response.data);
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};

const signup = async (req, res) => {
  const { name, username, password, email } = req.body;
  try {
    const requestData = {
      name: "name",
      username: username,
      password: password,
      email: "email",
    };
    const response = await axios.post(
      `http://localhost:3001/api/v1/passengers/signup`,
      requestData
    );
    if (response.status === 201) {
      const { message, newPassenger } = response.data;
      return res.status(201).json({ message, newPassenger });
    } else {
      return res.status(response.status).json(response.data);
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  login,
  signup,
};
