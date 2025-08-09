"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  Container,
  Stack,
  Paper,
  Divider
} from '@mui/material';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login data submitted:', formData);
    alert(`Đăng nhập với email: ${formData.email}`);
  };

  return (
    // Box cha để canh giữa toàn bộ form
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: 'calc(100vh - 160px)', // Trừ đi chiều cao Navbar và Footer (ước tính)
        backgroundColor: '#fdfcf9', // Một màu nền nhẹ
      }}
    >
      <Container maxWidth="xs">
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 3, md: 5 },
            border: '1px solid #e0e0e0',
            borderRadius: 0,
            backgroundColor: 'white'
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Typography variant="h4" fontFamily="serif" letterSpacing={10} textAlign="center" sx={{ mb: 5 }}>
              LUSSO
            </Typography>

            <Stack component="form" spacing={4} onSubmit={handleSubmit}>
              <TextField
                name="email"
                label="Email"
                variant="standard"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                variant="standard"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <MuiLink component={Link} href="/auth/forgot-password" variant="body2" underline="hover" color="text.secondary" sx={{ alignSelf: 'flex-start' }}>
                Quên mật khẩu?
              </MuiLink>
              <Button type="submit" variant="contained" fullWidth size="large" sx={{ py: 1.5, bgcolor: '#222', color: 'white', borderRadius: 0, boxShadow: 'none', '&:hover': { bgcolor: '#000' } }}>
                Đăng nhập
              </Button>
              <Divider sx={{ pt: 1 }}>
                  <Typography variant="body2" color="text.secondary">Chưa có tài khoản?</Typography>
              </Divider>
              <Button component={Link} href="/auth/register" variant="outlined" fullWidth size="large" sx={{ py: 1.5, color: '#222', borderColor: '#222', borderRadius: 0, '&:hover': { borderColor: '#000', bgcolor: 'rgba(0, 0, 0, 0.04)' } }}>
                Tạo tài khoản mới
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}