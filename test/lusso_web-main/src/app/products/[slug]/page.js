"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import productData from "@/data/productData";
import {
  Box,
  Typography,
  Button,
  Grid,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Breadcrumbs,
  Link as MuiLink,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  CircularProgress,
  Stack,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { useCart } from "@/context/CartContext";
import RemoveIcon from "@mui/icons-material/Remove";

export default function ProductDetailPage() {
  const { addToCart } = useCart();
  const params = useParams();
  const slug = params.slug;
  const router = useRouter();
  const product = productData.find((p) => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState(null);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("Beige");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      const initialImage = product.gallery?.[0] || product.image;
      setSelectedImage(initialImage);
    }
  }, [product]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  if (!product) {
    return (
      <Box sx={{ p: 6, textAlign: "center", height: "50vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h5">Sản phẩm không tồn tại</Typography>
        <Button component={Link} href="/shop" variant="outlined" sx={{ mt: 2 }}>
          Quay lại Shop
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "1440px", mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 4 }}>
        <MuiLink component={Link} underline="hover" color="inherit" href="/">
          Trang chủ
        </MuiLink>
        <MuiLink component={Link} underline="hover" color="inherit" href="/shop">
          Shop
        </MuiLink>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4} alignItems="flex-start">
        {/* Cột trái: Ảnh sản phẩm */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: "relative", width: "100%", aspectRatio: "4 / 5", mb: 2, backgroundColor: "#f5f5f5" }}>
            {selectedImage ? (
              <Image src={selectedImage} alt={product.name} fill style={{ objectFit: "cover" }} priority />
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                <CircularProgress color="inherit" />
              </Box>
            )}
          </Box>

          <Stack direction="row" spacing={2}>
            {(product.gallery || []).map((img, idx) => (
              <Box
                key={idx}
                onClick={() => setSelectedImage(img)}
                sx={{
                  position: "relative",
                  width: 80,
                  height: 80,
                  cursor: "pointer",
                  border: selectedImage === img ? "2px solid black" : "1px solid #ddd",
                  overflow: "hidden",
                }}
              >
                <Image src={img} alt={`thumb-${idx}`} fill style={{ objectFit: "cover" }} />
              </Box>
            ))}
          </Stack>
        </Grid>

        {/* Cột phải: Thông tin sản phẩm */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" fontWeight={600}>{product.name}</Typography>
              <Typography variant="h5" color="text.secondary">
                {product.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
              </Typography>
            </Box>

            <Divider />

            <Stack spacing={2}>
              <Box>
                <Typography fontWeight={500} mb={1.5}>Màu sắc: {color}</Typography>
                <ToggleButtonGroup value={color} exclusive onChange={(e, val) => val && setColor(val)}>
                  {["Beige", "Black", "White"].map((c) => (
                    <ToggleButton
                      key={c}
                      value={c}
                      sx={{
                        borderRadius: "50% !important",
                        width: 32,
                        height: 32,
                        backgroundColor: c.toLowerCase(),
                        border: "1px solid #ccc",
                        "&.Mui-selected": { border: "2px solid black" },
                      }}
                    />
                  ))}
                </ToggleButtonGroup>
              </Box>

              <Box>
                <Typography fontWeight={500} mb={1.5}>Kích thước</Typography>
                <ToggleButtonGroup size="small" value={size} exclusive onChange={(e, val) => val && setSize(val)}>
                  {["S", "M", "L", "XL"].map((s) => (
                    <ToggleButton key={s} value={s} sx={{ px: 2 }}>
                      {s}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Typography fontWeight={500}>Số lượng</Typography>
                <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: 1 }}>
                  <IconButton size="small" onClick={() => handleQuantityChange(-1)}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography sx={{ px: 2, fontWeight: 500 }}>{quantity}</Typography>
                  <IconButton size="small" onClick={() => handleQuantityChange(1)}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Stack>

            <Button
  fullWidth
  variant="contained"
  size="large"
  sx={{ py: 1.5, bgcolor: "#222", "&:hover": { bgcolor: "#000" } }}
  onClick={() => {
    addToCart(product, quantity, size, color);
  }}
>
  Thêm vào giỏ hàng
</Button>


            <Box sx={{ pt: 2 }}>
              <Accordion defaultExpanded elevation={0} sx={{ bgcolor: "transparent", "&:before": { display: "none" } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
                  <Typography fontWeight={600}>MÔ TẢ SẢN PHẨM</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0 }}>
                  <Typography color="text.secondary">{product.description}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion elevation={0} sx={{ bgcolor: "transparent", "&:before": { display: "none" } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
                  <Typography fontWeight={600}>GIAO HÀNG & ĐỔI TRẢ</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0 }}>
                  <Typography color="text.secondary">
                    Giao hàng 2-4 ngày. Miễn phí cho đơn hàng trên 2.000.000đ. Miễn phí đổi trả 30 ngày.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
