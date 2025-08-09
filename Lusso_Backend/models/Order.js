// models/Order.js
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  customerInfo: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    address: { type: String, required: true }, // số nhà, tên đường...
  },

  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: { type: String, required: true }, // tên sản phẩm để dễ tra cứu
      price: { type: Number, required: true },
      size: { type: String },
      color: { type: String },
      quantity: { type: Number, required: true },
      image: { type: String }
    },
  ],

  totalAmount: { type: Number, required: true },

  paymentMethod: {
    type: String,
    enum: ["card", "cod"],
    default: "cod",
  },

  cardInfo: {
    cardName: { type: String },
    cardNumber: { type: String },
    cardExpiry: { type: String },
    cardCVC: { type: String },
  },

  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "canceled"],
    default: "pending",
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
