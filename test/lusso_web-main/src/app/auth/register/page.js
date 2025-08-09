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
} from '@mui/material';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Register data submitted:', formData);
    alert(`Đăng ký thành công cho email: ${formData.email}`);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: 'calc(100vh - 160px)',
        backgroundColor: '#fdfcf9',
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
              Tạo tài khoản
            </Typography>

            <Stack component="form" spacing={3} onSubmit={handleSubmit}>
              <Stack direction="row" spacing={2}>
                <TextField name="firstName" label="Họ" variant="standard" fullWidth InputLabelProps={{ shrink: true }} value={formData.firstName} onChange={handleChange} required />
                <TextField name="lastName" label="Tên" variant="standard" fullWidth InputLabelProps={{ shrink: true }} value={formData.lastName} onChange={handleChange} required />
              </Stack>
              <TextField name="email" label="Email" type="email" variant="standard" fullWidth InputLabelProps={{ shrink: true }} value={formData.email} onChange={handleChange} required />
              <TextField name="password" label="Mật khẩu" type="password" variant="standard" fullWidth InputLabelProps={{ shrink: true }} value={formData.password} onChange={handleChange} required />
              
              <Button type="submit" variant="contained" fullWidth size="large" sx={{ py: 1.5, bgcolor: '#222', color: 'white', borderRadius: 0, boxShadow: 'none', '&:hover': { bgcolor: '#000' }, mt: 2 }}>
                Đăng ký
              </Button>
              
              <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ pt: 1 }}>
                Đã có tài khoản?{' '}
                <MuiLink component={Link} href="/auth/login" underline="hover" color="text.primary">
                  Đăng nhập
                </MuiLink>
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}