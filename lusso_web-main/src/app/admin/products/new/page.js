"use client";

import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { createProduct, uploadImage, getCategories } from "@/lib/productApi";
import { useRouter } from "next/navigation";

export default function ProductForm() {
  const { register, handleSubmit, reset } = useForm();
  const [categories, setCategories] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data);
      } catch (err) {
        console.error("Lỗi khi tải danh mục:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleMainImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleGalleryChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setGalleryFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const onSubmit = async (formData) => {
    try {
      let imageUrl = "";
      let galleryUrls = [];

      // Upload ảnh chính
      if (mainImage) {
        const imageForm = new FormData();
        imageForm.append("image", mainImage);
        const uploadRes = await uploadImage(imageForm);
        imageUrl = uploadRes.data.imageUrl;
      }

      // Upload gallery (nhiều ảnh)
      for (let file of galleryFiles) {
        const galleryForm = new FormData();
        galleryForm.append("image", file);
        const galleryRes = await uploadImage(galleryForm);
        galleryUrls.push(galleryRes.data.imageUrl);
      }

      const productData = {
        name: formData.name,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category,
        description: formData.description,
        imageUrl,
        gallery: galleryUrls,
        colors: formData.colors
          ? formData.colors.split(",").map((c) => c.trim())
          : [],
        sizes: formData.sizes
          ? formData.sizes.split(",").map((s) => s.trim())
          : [],
      };

      await createProduct(productData);

      setOpenSnackbar(true);
      reset();
      setMainImage(null);
      setGalleryFiles([]);

      setTimeout(() => {
        router.push("/admin/products");
      }, 1500);
    } catch (err) {
      console.error("Lỗi backend:", err.response?.data || err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Thêm sản phẩm
        </Typography>

        <TextField
          label="Tên sản phẩm"
          fullWidth
          margin="normal"
          required
          {...register("name")}
        />
        <TextField
          label="Giá"
          type="number"
          fullWidth
          margin="normal"
          required
          {...register("price")}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Danh mục</InputLabel>
          <Select
            labelId="category-label"
            defaultValue=""
            {...register("category")}
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
          multiline
          rows={4}
          fullWidth
          margin="normal"
          {...register("description")}
        />

        <TextField
          label="Màu sắc (ngăn cách bằng dấu phẩy)"
          fullWidth
          margin="normal"
          {...register("colors")}
        />

        <TextField
          label="Kích thước (ngăn cách bằng dấu phẩy)"
          fullWidth
          margin="normal"
          {...register("sizes")}
        />

        {/* Ảnh chính */}
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Ảnh chính
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={handleMainImageChange}
          required
        />
        {mainImage && (
          <Box sx={{ mt: 1 }}>
            <img
              src={URL.createObjectURL(mainImage)}
              alt="Main preview"
              width={120}
              height={120}
              style={{ objectFit: "cover", borderRadius: 4 }}
            />
          </Box>
        )}

        {/* Gallery */}
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Thư viện ảnh (gallery)
        </Typography>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryChange}
        />
        {galleryFiles.length > 0 && (
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
            {galleryFiles.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt={`preview-${i}`}
                width={100}
                height={100}
                style={{ objectFit: "cover", borderRadius: 4 }}
              />
            ))}
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 2 }}
        >
          Lưu sản phẩm
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          Thêm sản phẩm thành công!
        </Alert>
      </Snackbar>
    </Container>
  );
}
