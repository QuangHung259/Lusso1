"use client";

import React, { useState } from "react";
import { AppBar, Toolbar, Box, Typography, IconButton, Button, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'; // Icon User
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'; // Icon Giỏ hàng
import LussoDrawerMenu from "./LussoDrawerMenu";
import Link from "next/link";

// Quản lý các link chính ở đây cho dễ
const navItems = [
  { text: "Shop", href: "/shop" },
  { text: "Collections", href: "/collections" },
];

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "white",
          color: "black",
          borderBottom: '1px solid #eee' // Thêm một đường kẻ mỏng cho tinh tế
        }}
      >
        {/* Dùng justifyContent: 'space-between' để đẩy các phần tử ra xa nhau */}
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: { xs: 64, md: 80 } }}>
          
          {/* === CỘT TRÁI === */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              component={Link}
              href="/contact"
              sx={{
                display: { xs: 'none', md: 'flex' },
                color: 'black',
                textTransform: 'none',
                fontWeight: 400
              }}
            >
              Contact us
            </Button>
          </Box>

          {/* === CỘT GIỮA (LOGO) === */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography
                variant="h5"
                fontWeight={400} // Giảm độ đậm cho thanh lịch hơn
                letterSpacing={{ xs: 8, md: 15 }}
                fontFamily="serif"
                sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}
              >
                LUSSO
              </Typography>
            </Link>
          </Box>

          {/* === CỘT PHẢI === */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {/* Các link chính chỉ hiện trên desktop */}
            <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  href={item.href}
                  sx={{ color: 'black', textTransform: 'none', fontWeight: 400 }}
                >
                  {item.text}
                </Button>
              ))}
            </Stack>
            
            {/* Các icon */}
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} href="/auth/login">
              <PersonOutlineIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} href="/cart">
              <ShoppingBagOutlinedIcon />
            </IconButton>

            {/* Nút Menu cho Drawer */}
            <IconButton color="inherit" onClick={() => setOpenDrawer(true)} sx={{ ml: 1 }}>
              <MenuIcon />
            </IconButton>
          </Box>

        </Toolbar>
      </AppBar>

      <LussoDrawerMenu open={openDrawer} onClose={() => setOpenDrawer(false)} />
    </>
  );
}