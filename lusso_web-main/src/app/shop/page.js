"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/navigation";
import { getProducts } from "@/api/productApi";
import { getCategories } from "@/api/categoryApi"; // ✅ API mới
import { useCart } from "@/context/CartContext";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["Tất cả"]); // ✅ State cho categories
  const router = useRouter();
  const { addToCart } = useCart();

  // Lấy danh mục từ backend
  useEffect(() => {
    getCategories().then((data) => {
      const names = data.map((c) => c.name);
      setCategories(["Tất cả", ...names]); // ✅ Ghép "Tất cả" vào đầu
    });
  }, []);

  // Lấy sản phẩm từ backend
  useEffect(() => {
    getProducts().then((data) => {
      const mapped = data.map((p) => ({
        id: p._id,
        slug: p.slug,
        name: p.name,
        image: p.image,
        price: p.price,
        category: p.category?.name || "Uncategorized",
      }));
      setProducts(mapped);
    });
  }, []);

  // Lọc sản phẩm theo category
  const filteredProducts =
    selectedCategory === "Tất cả"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <Box sx={{ maxWidth: "1440px", mx: "auto", px: { xs: 2, md: 4 }, py: 6 }}>
      {/* Bộ lọc danh mục */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "contained" : "outlined"}
            onClick={() => setSelectedCategory(cat)}
            sx={{
              textTransform: "none",
              px: 3,
              py: 1,
              borderRadius: 5,
              fontWeight: 500,
              backgroundColor:
                selectedCategory === cat ? "#222" : "transparent",
              color: selectedCategory === cat ? "#fff" : "#222",
              borderColor: "#ccc",
              "&:hover": {
                backgroundColor:
                  selectedCategory === cat ? "#111" : "#f3f3f3",
              },
            }}
          >
            {cat}
          </Button>
        ))}
      </Box>

      {/* Tiêu đề */}
      <Typography
        variant="h5"
        fontWeight={600}
        mb={4}
        fontFamily="serif"
        textAlign="center"
      >
        {selectedCategory === "Tất cả" ? "Tất cả sản phẩm" : selectedCategory}
      </Typography>

      {/* Danh sách sản phẩm */}
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                transition: "0.3s",
                position: "relative",
                cursor: "pointer",
                "&:hover": { transform: "scale(1.02)" },
              }}
              onClick={() => router.push(`/products/${product.slug}`)}
            >
              <Box sx={{ position: "relative" }}>
                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  sx={{
                    width: "100%",
                    height: 320,
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "rgba(255,255,255,0.8)",
                    display: "none",
                    "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                  }}
                  className="cart-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product, 1, "default", "default");
                  }}
                >
                  <ShoppingCartIcon />
                </IconButton>
              </Box>
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Typography fontWeight={600} mb={1}>
                  {product.name}
                </Typography>
                <Typography color="text.secondary">
                  {product.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Hover hiện icon */}
      <style jsx global>{`
        .MuiPaper-root:hover .cart-icon {
          display: flex !important;
        }
      `}</style>
    </Box>
  );
}
