"use client";

import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

const servicesData = [
  {
    icon: <LocalShippingOutlinedIcon sx={{ fontSize: 40, color: 'text.secondary' }} />,
    title: 'Miễn phí vận chuyển',
    description: 'Áp dụng cho mọi đơn hàng có giá trị từ 2.000.000đ trở lên.',
  },
  {
    icon: <PublishedWithChangesOutlinedIcon sx={{ fontSize: 40, color: 'text.secondary' }} />,
    title: 'Đổi trả dễ dàng',
    description: 'Miễn phí đổi trả trong vòng 30 ngày cho mọi sản phẩm.',
  },
  {
    icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 40, color: 'text.secondary' }} />,
    title: 'Thanh toán an toàn',
    description: 'Bảo mật tuyệt đối thông tin thanh toán của khách hàng.',
  },
];

export default function ServicesSection() {
  return (
    <Box sx={{ backgroundColor: '#fdfcf9', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          fontFamily="serif" 
          textAlign="center" 
          sx={{ mb: 6 }}
        >
          Dịch vụ & Đặc quyền
        </Typography>

        <Grid 
          container 
          spacing={4}
          justifyContent="center"
          alignItems="flex-start"
        >
          {servicesData.map((service, index) => (
            <Grid 
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box sx={{ mb: 2 }}>{service.icon}</Box>
              <Typography 
                variant="h6" 
                fontWeight={500} 
                fontFamily="serif" 
                sx={{ mb: 1 }}
              >
                {service.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {service.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
