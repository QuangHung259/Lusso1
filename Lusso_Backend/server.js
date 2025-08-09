// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// ✅ Import các route modules
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const shippingRoutes = require("./routes/shippingRoutes");
const contactRoutes = require("./routes/contactRoutes");

// ✅ Load biến môi trường
dotenv.config();

// ✅ Khởi tạo app
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // ⚡ cho phép gọi từ FE
    credentials: true,
  })
);
app.use(express.json());

// ✅ Test API
app.get("/", (req, res) => {
  res.send("🚀 API đang hoạt động!");
});

// ✅ Đăng ký Routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/contact", contactRoutes);

// ✅ Middleware xử lý lỗi chung
app.use((err, req, res, next) => {
  console.error("❌ Lỗi:", err.stack);
  res.status(500).json({ message: "Lỗi server", error: err.message });
});

// ✅ Kết nối MongoDB & khởi động server
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB đã kết nối thành công!");

    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Không thể kết nối MongoDB:", err.message);
    process.exit(1);
  }
};

startServer();
