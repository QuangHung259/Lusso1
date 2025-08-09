"use client";

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  TextField,
  Stack,
  Link as MuiLink,
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useNotification } from '@/context/NotificationContext'; // 1. Import useNotification

export default function ContactPage() {
  const { showNotification } = useNotification(); // 2. Lấy hàm showNotification từ context
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Contact form submitted:", formData);
    
    // 3. Xóa alert() và thay bằng showNotification()
    showNotification("Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất!");
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Box sx={{ backgroundColor: '#fdfcf9', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontFamily="serif" textAlign="center" sx={{ mb: 6 }}>
          Liên hệ
        </Typography>
        
        <Grid container spacing={{ xs: 6, md: 8 }}>
          {/* CỘT TRÁI: THÔNG TIN VÀ BẢN ĐỒ */}
          <Grid item xs={12} md={5}>
            <Stack spacing={4}>
              <Typography variant="h5" fontFamily="serif">
                Thông tin cửa hàng
              </Typography>
              <Stack spacing={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <LocationOnOutlinedIcon color="action" />
                  <Box>
                    <Typography fontWeight={600}>Địa chỉ</Typography>
                    <Typography variant="body2" color="text.secondary">
                      123 Đường ABC, Quận 1, Thành phố Hồ Chí Minh
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <LocalPhoneOutlinedIcon color="action" />
                  <Box>
                    <Typography fontWeight={600}>Điện thoại</Typography>
                    <MuiLink href="tel:0987654321" color="text.secondary" underline="hover" variant="body2">
                      0336 567 177
                    </MuiLink>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <EmailOutlinedIcon color="action" />
                  <Box>
                    <Typography fontWeight={600}>Email</Typography>
                    <MuiLink href="mailto:contact@lusso.com" color="text.secondary" underline="hover" variant="body2">
                      contact@lusso.com
                    </MuiLink>
                  </Box>
                </Stack>
              </Stack>
              
              <Box sx={{ height: 300, width: '100%', mt: 2, filter: 'grayscale(100%)' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.447033878418!2d106.7022832147485!3d10.777014892320792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f469b036577%3A0x1b1333935272a08d!2zQml0ZXhjbyBGaW5hbmNpYWwgVG93ZXIsIDE5MCDEkC4gTmd1eeG7hW4gSHXhu4csIELhur9uIE5naMOhLCBRdeG6rW4gMSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1691517000000!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </Stack>
          </Grid>

          {/* CỘT PHẢI: FORM LIÊN HỆ */}
          <Grid item xs={12} md={7}>
            <Stack component="form" spacing={3} onSubmit={handleSubmit}>
              <Typography variant="h5" fontFamily="serif">
                Gửi tin nhắn cho chúng tôi
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField name="name" label="Họ và tên" required fullWidth value={formData.name} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name="email" label="Email" type="email" required fullWidth value={formData.email} onChange={handleChange} />
                </Grid>
              </Grid>
              <TextField name="subject" label="Chủ đề" required fullWidth value={formData.subject} onChange={handleChange} />
              <TextField name="message" label="Lời nhắn" required fullWidth multiline rows={6} value={formData.message} onChange={handleChange} />
              <Box>
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large" 
                  sx={{ py: 1.5, px: 5, bgcolor: '#222', '&:hover': { bgcolor: '#000' }, borderRadius: 0 }}
                >
                  Gửi tin nhắn
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}