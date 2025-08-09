//components/Footer

'use client';

import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink, IconButton, Divider, Stack, TextField, InputAdornment } from '@mui/material';
import Link from 'next/link';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const customerServiceLinks = [
  { text: 'Liên hệ', href: '/contact' },
  { text: 'Câu hỏi thường gặp', href: '/faq' },
  { text: 'Chính sách vận chuyển', href: '/shipping-policy' },
  { text: 'Chính sách đổi trả', href: '/returns' },
];

const companyLinks = [
    { text: 'Trang chủ', href: '/' },
  { text: 'Câu chuyện LUSSO', href: '/#story-section' },
  { text: 'Phát triển bền vững', href: '/sustainability' },
  { text: 'Điều khoản dịch vụ', href: '/terms-of-service' },
  { text: 'Chính sách bảo mật', href: '/privacy-policy' },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f8f7f3',
        borderTop: '1px solid #e0e0e0',
        py: { xs: 4, md: 6 }, // Giảm padding tổng thể từ 8 xuống 6
        px: { xs: 2, md: 4 },
        color: 'text.secondary',
      }}
    >
      <Container maxWidth="lg">
        
        {/* Logo ở giữa */}
        <Box sx={{ textAlign: 'center', mb: 5 }}> {/* Giảm khoảng cách dưới từ 6 xuống 5 */}
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant="h5" // Giảm kích thước logo từ h4 xuống h5
              fontWeight={400}
              letterSpacing={15}
              fontFamily="serif"
            >
              LUSSO
            </Typography>
          </Link>
        </Box>

        {/* Layout 3 cột */}
        <Grid container spacing={{ xs: 4, md: 5 }} justifyContent="center"> {/* Giảm spacing từ 8 xuống 5 */}
          
          {/* Cột 1: Chăm sóc khách hàng */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" fontFamily="serif" gutterBottom sx={{ color: 'text.primary', mb: 2, fontSize: '1.1rem' }}> {/* Giảm nhẹ cỡ chữ tiêu đề */}
              Chăm sóc khách hàng
            </Typography>
            <Stack spacing={1.2}> {/* Giảm khoảng cách giữa các link từ 1.5 xuống 1.2 */}
              {customerServiceLinks.map((link) => (
                <MuiLink component={Link} href={link.href} key={link.text} variant="body2" color="inherit" underline="hover">
                  {link.text}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Cột 2: Công ty */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" fontFamily="serif" gutterBottom sx={{ color: 'text.primary', mb: 2, fontSize: '1.1rem' }}>
              Công ty
            </Typography>
            <Stack spacing={1.2}>
              {companyLinks.map((link) => (
                <MuiLink component={Link} href={link.href} key={link.text} variant="body2" color="inherit" underline="hover">
                  {link.text}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Cột 3: Kết nối & Đăng ký */}
          <Grid item xs={12} sm={4} md={4}>
            <Typography variant="h6" fontFamily="serif" gutterBottom sx={{ color: 'text.primary', mb: 2, fontSize: '1.1rem' }}>
              Đăng ký nhận bản tin
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Nhận thông tin về sản phẩm mới và các ưu đãi độc quyền.
            </Typography>
            <TextField
              variant="standard"
              placeholder="Địa chỉ email của bạn"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" size="small">
                      <ArrowForwardIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <Stack direction="row" spacing={1}>
              <IconButton color="inherit" aria-label="instagram" component="a" href="https://instagram.com" target="_blank">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="facebook" component="a" href="https://facebook.com" target="_blank">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="pinterest" component="a" href="https://pinterest.com" target="_blank">
                <PinterestIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 4, md: 5 }, borderColor: '#ddd' }} /> {/* Giảm margin */}

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} LUSSO. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}