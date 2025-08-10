// controllers/orderController.js
const Order = require("../models/Order");

// [1] Thêm đơn hàng mới
// [1] Thêm đơn hàng mới
const createOrder = async (req, res) => {
  try {
    console.log("Dữ liệu nhận từ client:", req.body);
    console.log("User từ authMiddleware:", req.user);
    console.log(
      "🌐 Kết nối MongoDB:",
      Order.db?.databaseName,
      " - URI:",
      process.env.MONGO_URI
    );

    const { customerInfo, products, totalAmount, paymentMethod, cardInfo } =
      req.body;

    // Validate customer info
    if (
      !customerInfo ||
      !customerInfo.name ||
      !customerInfo.phone ||
      !customerInfo.email ||
      !customerInfo.city ||
      !customerInfo.district ||
      !customerInfo.address
    ) {
      console.warn("⚠️ Thiếu thông tin khách hàng:", customerInfo);
      return res.status(400).json({ message: "Thiếu thông tin khách hàng" });
    }

    // Validate products
    if (
      !Array.isArray(products) ||
      products.length === 0 ||
      products.some(
        (p) => !p.product || !p.name || p.quantity <= 0 || p.price < 0
      )
    ) {
      console.warn("⚠️ Dữ liệu sản phẩm không hợp lệ:", products);
      return res.status(400).json({ message: "Dữ liệu sản phẩm không hợp lệ" });
    }

    // Validate totalAmount
    if (typeof totalAmount !== "number" || totalAmount < 0) {
      console.warn("⚠️ Tổng tiền không hợp lệ:", totalAmount);
      return res.status(400).json({ message: "Tổng tiền không hợp lệ" });
    }

    const user = req.user; // lấy từ authMiddleware

    const newOrder = new Order({
      user: user._id,
      customerInfo,
      products,
      totalAmount,
      paymentMethod: paymentMethod || "cod",
      cardInfo: paymentMethod === "card" ? cardInfo : {},
      status: "pending",
    });

    const savedOrder = await newOrder.save();
    console.log("Order đã lưu:", savedOrder);

    res.status(201).json({
      message: "Đơn hàng đã được tạo!",
      order: savedOrder,
    });
  } catch (error) {
    console.error("LỖI KHI TẠO ĐƠN HÀNG:", error);
    res.status(500).json({ message: "Lỗi khi tạo đơn hàng", error });
  }
};

// [2] Lấy danh sách đơn hàng
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "fullName email")
      .populate("products.product", "name price image");

    if (!orders.length) {
      return res.status(404).json({ message: "Không có đơn hàng nào" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// [3] Lấy đơn hàng theo ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "fullName email")
      .populate("products.product", "name price image");

    if (!order)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy đơn hàng", error });
  }
};

// [4] Cập nhật trạng thái đơn hàng
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    res
      .status(200)
      .json({ message: "Cập nhật thành công", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật đơn hàng", error });
  }
};

// [5] Xóa đơn hàng
const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    res.status(200).json({ message: "Xóa đơn hàng thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa đơn hàng", error });
  }
};

// [6] Lấy đơn hàng của người dùng hiện tại
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("products.product", "name price image");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng của người dùng:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getUserOrders,
};
