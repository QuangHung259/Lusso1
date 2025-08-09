"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { getProductById, updateProduct, getCategories } from "@/lib/productApi";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function ProductEdit() {
  const { id } = useParams();
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    colors: "",
    sizes: "",
  });

  useEffect(() => {
    const fetchProductAndCategories = async () => {
      try {
        const [productRes, categoriesRes] = await Promise.all([
          getProductById(id),
          getCategories(),
        ]);

        const product = productRes.data;
        setFormData({
          name: product.name || "",
          price: product.price || "",
          description: product.description || "",
          colors: product.colors?.join(", ") || "",
          sizes: product.sizes?.join(", ") || "",
        });

        setValue("category", product.category?._id || "");
        setSelectedCategory(product.category?._id || "");
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error("Lỗi khi load dữ liệu:", err);
      }
    };

    if (id) fetchProductAndCategories();
  }, [id, setValue]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async () => {
    const productData = {
      ...formData,
      price: Number(formData.price),
      category: selectedCategory,
      colors: formData.colors
        ? formData.colors.split(",").map((c) => c.trim())
        : [],
      sizes: formData.sizes
        ? formData.sizes.split(",").map((s) => s.trim())
        : [],
    };

    await updateProduct(id, productData);
    router.push("/admin/products");
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Sửa sản phẩm
        </Typography>

        <TextField
          label="Tên sản phẩm"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Giá"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Danh mục</InputLabel>
          <Select
            labelId="category-label"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setValue("category", e.target.value);
            }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Mô tả"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Màu sắc (ngăn cách bằng dấu phẩy)"
          name="colors"
          value={formData.colors}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Kích thước (ngăn cách bằng dấu phẩy)"
          name="sizes"
          value={formData.sizes}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Cập nhật
        </Button>
      </Box>
    </Container>
  );
}
