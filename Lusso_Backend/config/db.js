const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1); // Dừng server nếu không kết nối được
  }
};

module.exports = connectDB;
