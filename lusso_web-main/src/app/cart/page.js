"use client";

import React, { useState } from "react";
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
  Modal,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// Component Modal yêu cầu đăng nhập
const AuthModal = ({ open, handleClose }) => (
  <Modal open={open} onClose={handleClose} aria-labelledby="auth-modal-title">
    <Paper sx={{ 
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 400 },
        p: 4, textAlign: 'center', borderRadius: 0, boxShadow: 24,
    }}>
      <Typography id="auth-modal-title" variant="h5" fontFamily="serif" sx={{ mb: 2 }}>
        Yêu cầu đăng nhập
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Vui lòng đăng nhập hoặc tạo tài khoản để tiếp tục thanh toán.
      </Typography>
      <Stack spacing={2}>
        <Button 
          component={Link} 
          href="/auth/login?redirect=/checkout" 
          variant="contained" 
          fullWidth
          size="large"
          sx={{ bgcolor: '#222', '&:hover': { bgcolor: '#000' }, borderRadius: 0, py: 1.5 }}
        >
          Đăng nhập
        </Button>
        <Button 
          component={Link} 
          href="/auth/register" 
          variant="outlined"
          fullWidth
          size="large"
          sx={{ color: '#222', borderColor: '#222', borderRadius: 0, py: 1.5, '&:hover': { borderColor: '#000', bgcolor: 'rgba(0,0,0,0.04)' } }}
        >
          Tạo tài khoản mới
        </Button>
      </Stack>
    </Paper>
  </Modal>
);


export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = (event) => {
    if (!isAuthenticated) {
      event.preventDefault(); // Ngăn Link chuyển trang
      setOpenAuthModal(true); // Mở Modal
    }
    // Nếu đã đăng nhập, Link sẽ tự động chuyển đến trang /checkout
  };

  if (cartItems.length === 0) {
    return (
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
    );
  }

  return (
    <>
      <Box sx={{ backgroundColor: '#fdfcf9', py: { xs: 4, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontFamily="serif" sx={{ textAlign: 'center', mb: 5 }}>
            Giỏ hàng của bạn
          </Typography>
          <Grid container spacing={{ xs: 4, md: 6 }}>
            {/* CỘT TRÁI: DANH SÁCH SẢN PHẨM */}
            <Grid item xs={12} lg={8}>
              <Stack divider={<Divider />}>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, color: 'text.secondary', pb: 1 }}>
                    <Typography variant="body2" sx={{ width: '50%' }}>Sản phẩm</Typography>
                    <Typography variant="body2" sx={{ width: '25%', textAlign: 'center' }}>Số lượng</Typography>
                    <Typography variant="body2" sx={{ width: '25%', textAlign: 'right' }}>Tổng phụ</Typography>
                </Box>
                {cartItems.map((item) => (
                  <Grid container key={`${item.id}-${item.size}-${item.color}`} spacing={2} alignItems="center" sx={{ py: 2 }}>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ position: 'relative', width: 100, height: 120, backgroundColor: '#f5f5f5' }}>
                        <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" />
                      </Box>
                      <Box>
                        <Typography fontWeight={600} component={Link} href={`/products/${item.slug}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Size: {item.size} / Màu: {item.color}
                        </Typography>
                        <IconButton onClick={() => removeFromCart(item.id, item.size, item.color)} sx={{ display: { xs: 'inline-flex', sm: 'none' }, p: 0, mt: 1 }}>
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', sm: 'center' }, border: '1px solid #ccc', borderRadius: 1, width: 'fit-content' }}>
                        <IconButton size="small" onClick={() => updateQuantity(item.id, item.size, item.color, -1)}>
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ px: 2, fontWeight: 500 }}>{item.quantity}</Typography>
                        <IconButton size="small" onClick={() => updateQuantity(item.id, item.size, item.color, 1)}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3} sx={{ textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <Typography fontWeight={500} sx={{ flexGrow: 1 }}>
                        {(item.price * item.quantity).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                      </Typography>
                      <IconButton onClick={() => removeFromCart(item.id, item.size, item.color)} sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
              </Stack>
            </Grid>

            {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG */}
            <Grid item xs={12} lg={4}>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 0, bgcolor: 'transparent', position: 'sticky', top: 100 }}>
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
                <Button 
                    component={Link} 
                    href="/checkout"
                    onClick={handleCheckout}
                    fullWidth 
                    variant="contained" 
                    size="large" 
                    sx={{ py: 1.5, bgcolor: '#222', '&:hover': { bgcolor: '#000' }, borderRadius: 0 }}
                >
                  Tiến hành thanh toán
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      <AuthModal open={openAuthModal} handleClose={() => setOpenAuthModal(false)} />
    </>
  );
}