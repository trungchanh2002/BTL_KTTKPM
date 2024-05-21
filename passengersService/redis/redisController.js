const redis = require("redis");

const client = redis.createClient({
  host: process.env.REDIS_HOST,
});

(async () => {
  try {
    await client.connect();
    console.log("Kết nối thành công Redis");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    process.exit(1);
  }
})();

client.on("connect", () => {
  console.log("Đang kết nối Redis...");
});

client.on("error", (err) => {
  console.error("Error in the Redis connection:", err);
});

module.exports = client;
