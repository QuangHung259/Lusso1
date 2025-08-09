// models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, required: true }, // slug cho SEO
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Lưu category dạng chuỗi thay vì ref
  price: { type: Number, required: true },
  image: { type: String }, // ảnh chính
  gallery: [{ type: String }], // mảng chứa nhiều ảnh
  colors: [{ type: String }],
  sizes: [{ type: String }],
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
