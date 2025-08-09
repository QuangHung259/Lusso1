//controllers/productController.js
const Product = require("../models/Products");
const Category = require("../models/Category");
const cloudinary = require("../config/cloudinary");

// [1] Thêm sản phẩm mới
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, colors, sizes } =
      req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "Hình ảnh là bắt buộc" });
    }

    const newProduct = new Product({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      description,
      price,
      image: imageUrl,
      gallery: req.body.gallery || [],
      category,
      colors: colors || [],
      sizes: sizes || [],
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Sản phẩm đã được thêm!", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm sản phẩm", error });
  }
};

// [2] Lấy danh sách sản phẩm
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Không có sản phẩm nào" });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// [3] Lấy chi tiết sản phẩm
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name"
    );

    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy sản phẩm", error });
  }
};

// [4] Cập nhật sản phẩm
const updateProduct = async (req, res) => {
  try {
    const { gallery } = req.body; // Nhận dữ liệu từ trường 'gallery'

    let updateData = { ...req.body }; // Copy tất cả các trường dữ liệu từ body
    if (gallery && Array.isArray(gallery)) {
      updateData.gallery = gallery; // Thêm các ảnh vào gallery nếu có
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData, // Cập nhật tất cả các trường, bao gồm cả gallery
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.status(200).json({
      message: "Cập nhật thành công",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật sản phẩm", error });
  }
};

// [5] Xóa sản phẩm
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.status(200).json({ message: "Xóa sản phẩm thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm", error });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate(
      "category",
      "name"
    );
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductBySlug,
};
