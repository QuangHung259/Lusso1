"use client";

import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Button, Grid, TextField, Paper, Stack, Divider,
  Link as MuiLink, Breadcrumbs, Radio, RadioGroup, FormControlLabel, FormControl, 
  InputLabel, Select, MenuItem
} from '@mui/material';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { provinces } from '@/data/vietnamProvinces';
import { useNotification } from '@/context/NotificationContext';


export default function CheckoutPage() {
  const { cartItems, cartCount, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { showNotification } = useNotification();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const [districts, setDistricts] = useState([]);
  const [formData, setFormData] = useState({
    email: '', name: '', phone: '',
    city: '', district: '', address: '',
    cardName: '', cardNumber: '', cardExpiry: '', cardCVC: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    if (formData.city) {
      const selectedCityData = provinces.find(p => p.name === formData.city);
      setDistricts(selectedCityData ? selectedCityData.districts : []);
    } else {
      setDistricts([]);
    }
  }, [formData.city]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cartItems.length === 0 && cartCount === 0) {
        router.replace('/shop');
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [cartItems, cartCount, router]);

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({ ...prev, email: user.email || '', name: user.name || '' }));
    }
  }, [isAuthenticated, user]);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'city') {
      setFormData(prev => ({ ...prev, city: value, district: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const orderData = {
      customerInfo: formData,
      items: cartItems,
      total: subtotal,
      paymentMethod: paymentMethod,
    };
    addOrder(orderData);
    showNotification('Đặt hàng thành công! Cảm ơn bạn đã mua sắm.');
    clearCart();
    router.push('/account/orders');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartCount === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Giỏ hàng trống, đang chuyển hướng...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#fdfcf9', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 4 }}>
          <MuiLink component={Link} underline="hover" color="inherit" href="/cart">Giỏ hàng</MuiLink>
          <Typography color="text.primary">Thanh toán</Typography>
        </Breadcrumbs>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={{ xs: 4, lg: 8 }}>
            {/* CỘT TRÁI: THÔNG TIN GIAO HÀNG & THANH TOÁN */}
            <Grid item xs={12} md={7}>
              <Stack spacing={5}>
                {/* Thông tin giao hàng */}
                <Box>
                  <Typography variant="h5" fontFamily="serif" gutterBottom>
                    Thông tin giao hàng
                  </Typography>
                  {/* SỬA LẠI CẤU TRÚC Ở ĐÂY */}
                  <Stack spacing={3} sx={{ mt: 2 }}>
                    <TextField name="name" label="Họ và tên" required fullWidth value={formData.name} onChange={handleChange} />
                    
                    {/* Dùng Box với display flex thay cho Grid */}
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                      <FormControl fullWidth required>
                        <InputLabel id="city-select-label">Tỉnh / Thành phố</InputLabel>
                        <Select
                          labelId="city-select-label"
                          name="city"
                          value={formData.city}
                          label="Tỉnh / Thành phố"
                          onChange={handleChange}
                        >
                          {provinces.map((option) => (
                            <MenuItem key={option.code} value={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth required disabled={!formData.city}>
                        <InputLabel id="district-select-label">Quận / Huyện</InputLabel>
                        <Select
                          labelId="district-select-label"
                          name="district"
                          value={formData.district}
                          label="Quận / Huyện"
                          onChange={handleChange}
                        >
                          {districts.map((option) => (
                            <MenuItem key={option.code} value={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>

                    <TextField name="address" label="Địa chỉ cụ thể (Số nhà, tên đường, phường/xã)" required fullWidth value={formData.address} onChange={handleChange} />
                    <TextField name="phone" label="Số điện thoại" required fullWidth value={formData.phone} onChange={handleChange} />
                    <TextField name="email" label="Email" type="email" required fullWidth value={formData.email} onChange={handleChange} />
                  </Stack>
                </Box>
                
                {/* Phương thức thanh toán */}
                <Box>
                  <Typography variant="h5" fontFamily="serif" gutterBottom>
                    Phương thức thanh toán
                  </Typography>
                  <FormControl component="fieldset" sx={{ mt: 1 }}>
                    <RadioGroup
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <FormControlLabel value="card" control={<Radio />} label="Thanh toán bằng thẻ (Credit/Debit Card)" />
                      <FormControlLabel value="cod" control={<Radio />} label="Thanh toán khi nhận hàng (COD)" />
                    </RadioGroup>
                  </FormControl>
                </Box>
                
                {paymentMethod === 'card' && (
                  <Box>
                    <Typography variant="h5" fontFamily="serif" gutterBottom>
                      Thông tin thẻ
                    </Typography>
                    <Stack spacing={3} sx={{ mt: 2 }}>
                      <TextField name="cardName" label="Tên trên thẻ" required={paymentMethod === 'card'} fullWidth value={formData.cardName} onChange={handleChange} />
                      <TextField name="cardNumber" label="Số thẻ" required={paymentMethod === 'card'} fullWidth value={formData.cardNumber} onChange={handleChange} />
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <TextField name="cardExpiry" label="Ngày hết hạn (MM/YY)" required={paymentMethod === 'card'} fullWidth value={formData.cardExpiry} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField name="cardCVC" label="CVC" required={paymentMethod === 'card'} fullWidth value={formData.cardCVC} onChange={handleChange} />
                        </Grid>
                      </Grid>
                    </Stack>
                  </Box>
                )}
              </Stack>
            </Grid>

            {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG */}
            <Grid item xs={12} md={5}>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 0, bgcolor: 'transparent', position: 'sticky', top: 100 }}>
                <Typography variant="h5" fontFamily="serif" fontWeight={600} gutterBottom>
                  Đơn hàng của bạn ({cartCount})
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={2} sx={{ maxHeight: 300, overflowY: 'auto', pr: 1 }}>
                  {cartItems.map(item => (
                    <Box key={`${item.id}-${item.size}-${item.color}`} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Box sx={{ position: 'relative', width: 64, height: 80, bgcolor: '#f5f5f5', flexShrink: 0 }}>
                        <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" />
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography fontWeight={500}>{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">SL: {item.quantity}</Typography>
                      </Box>
                      <Typography fontWeight={500} sx={{ whiteSpace: 'nowrap' }}>
                        {(item.price * item.quantity).toLocaleString("vi-VN", { currency: "VND" })}₫
                      </Typography>
                    </Box>
                  ))}
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color="text.secondary">Tổng phụ</Typography>
                    <Typography fontWeight={500}>{subtotal.toLocaleString("vi-VN", { currency: "VND" })}₫</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color="text.secondary">Vận chuyển</Typography>
                    <Typography fontWeight={500}>Miễn phí</Typography>
                  </Box>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" fontWeight={600}>Tổng cộng</Typography>
                  <Typography variant="h6" fontWeight={600}>{subtotal.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</Typography>
                </Box>
                <Button type="submit" fullWidth variant="contained" size="large" sx={{ py: 1.5, bgcolor: '#222', '&:hover': { bgcolor: '#000' }, borderRadius: 0 }}>
                  Hoàn tất đơn hàng
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}