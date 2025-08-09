"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  IconButton,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext"; // Import hook useCart
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <>
        <Container sx={{ textAlign: 'center', py: { xs: 8, md: 12 } }}>
          <Typography variant="h4" fontFamily="serif" gutterBottom>
            Giỏ hàng của bạn đang trống
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Hãy thêm vào những sản phẩm bạn yêu thích nhé.
          </Typography>
          <Button component={Link} href="/shop" variant="contained" sx={{ bgcolor: '#222', '&:hover': { bgcolor: '#000' }}}>
            Tiếp tục mua sắm
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ backgroundColor: '#fdfcf9', py: { xs: 4, md: 8 } }}>
        <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={{ xs: 4, md: 6 }} maxWidth="1200px">
            <Grid item xs={12} md={8}>
              <Stack divider={<Divider />} spacing={3}>
                {cartItems.map((item) => (
                  <Box key={`${item.id}-${item.size}-${item.color}`} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Box sx={{ position: 'relative', width: 100, height: 100, backgroundColor: '#f5f5f5' }}>
                      <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography fontWeight={600} component={Link} href={`/products/${item.slug}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Size: {item.size} / Màu: {item.color}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton size="small" onClick={() => updateQuantity(item.id, item.size, item.color, -1)}>
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ px: 2, fontWeight: 500 }}>{item.quantity}</Typography>
                      <IconButton size="small" onClick={() => updateQuantity(item.id, item.size, item.color, 1)}>
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography fontWeight={500} sx={{ width: 120, textAlign: 'right' }}>
                      {(item.price * item.quantity).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                    </Typography>
                    <IconButton onClick={() => removeFromCart(item.id, item.size, item.color)}>
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: 'transparent', position: 'sticky', top: 100 }}>
                <Typography variant="h5" fontFamily="serif" fontWeight={600} gutterBottom>
                  Tóm tắt đơn hàng
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color="text.secondary">Tổng phụ</Typography>
                    <Typography fontWeight={500}>{subtotal.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color="text.secondary">Vận chuyển</Typography>
                    <Typography fontWeight={500}>Miễn phí</Typography>
                  </Box>
                  <TextField label="Mã giảm giá" variant="outlined" size="small" />
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" fontWeight={600}>Tổng cộng</Typography>
                  <Typography variant="h6" fontWeight={600}>{subtotal.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</Typography>
                </Box>
                <Button component={Link} href="/checkout" fullWidth variant="contained" size="large" sx={{ py: 1.5, bgcolor: '#222', '&:hover': { bgcolor: '#000' } }}>
                  Tiến hành thanh toán
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
