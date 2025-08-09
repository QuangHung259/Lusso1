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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Forgot password for email:', email);
    alert(`Đã gửi link đặt lại mật khẩu đến: ${email}`);
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
            <Typography variant="h5" component="h1" textAlign="center" fontWeight={400} sx={{ mb: 1 }}>
              Đặt lại mật khẩu
            </Typography>
            <Typography color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
              Chúng tôi sẽ gửi một link đặt lại mật khẩu đến email của bạn.
            </Typography>

            <Stack component="form" spacing={4} onSubmit={handleSubmit}>
              <TextField
                name="email"
                label="Email"
                variant="standard"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="contained" fullWidth size="large" sx={{ py: 1.5, bgcolor: '#222', color: 'white', borderRadius: 0, boxShadow: 'none', '&:hover': { bgcolor: '#000' } }}>
                Gửi link đặt lại
              </Button>
              <Button component={Link} href="/auth/login" variant="text" fullWidth size="large" sx={{ color: 'text.secondary' }}>
                Hủy
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}