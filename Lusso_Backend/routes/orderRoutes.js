// routes/orderRoutes.js
const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getUserOrders,
} = require("../controllers/orderController");
const Order = require("../models/Order");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Tạo đơn hàng (user phải đăng nhập)
router.post("/", authMiddleware, createOrder);

// Lấy đơn hàng của user đang đăng nhập
router.get("/my-orders", authMiddleware, getUserOrders);

// Xem chi tiết đơn hàng theo ID (user phải đăng nhập)
router.get("/:id", authMiddleware, getOrderById);

// Admin lấy tất cả đơn hàng
router.get("/", authMiddleware, isAdmin, getOrders);

// Admin cập nhật trạng thái đơn hàng
router.put("/:id", authMiddleware, isAdmin, updateOrderStatus);

// Admin xóa đơn hàng
router.delete("/:id", authMiddleware, isAdmin, deleteOrder);

// User hủy đơn hàng của chính mình
router.put("/cancel/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const order = await Order.findOne({ _id: req.params.id, user: userId });

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng để hủy" });
    }

    if (order.status !== "pending") {
      return res.status(400).json({ message: "Chỉ có thể hủy đơn đang chờ xử lý" });
    }

    order.status = "canceled";
    await order.save();

    res.status(200).json({ message: "Đã hủy đơn hàng", order });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi hủy đơn hàng", error });
  }
});

module.exports = router;
