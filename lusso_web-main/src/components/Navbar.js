// components/Navbar.jsx
"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Avatar,
} from "@mui/material";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext"; // ✅ Chỉ dùng AuthContext
import { useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LussoDrawerMenu from "./LussoDrawerMenu";

const navItems = [
  { text: "Shop", href: "/shop" },
  { text: "Collections", href: "/collections" },
];

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { cartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth(); // ✅ Lấy từ AuthContext
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const isUserMenuOpen = Boolean(anchorEl);

  const handleUserMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleUserMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    router.push("/auth/login");
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "white",
          color: "black",
          borderBottom: "1px solid #eee",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: { xs: 64, md: 80 },
          }}
        >
          {/* Left */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
            <Button
              component={Link}
              href="/contact"
              sx={{
                display: { xs: "none", md: "flex" },
                color: "black",
                textTransform: "none",
                fontWeight: 400,
              }}
            >
              Contact us
            </Button>
          </Box>

          {/* Logo */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                variant="h5"
                fontWeight={400}
                letterSpacing={{ xs: 8, md: 15 }}
                fontFamily="serif"
                sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
              >
                LUSSO
              </Typography>
            </Link>
          </Box>

          {/* Right */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {/* Desktop nav */}
            <Stack
              direction="row"
              spacing={2}
              sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  href={item.href}
                  sx={{ color: "black", textTransform: "none", fontWeight: 400 }}
                >
                  {item.text}
                </Button>
              ))}
            </Stack>

            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>

            {/* User menu */}
            {isAuthenticated ? (
              <IconButton color="inherit" onClick={handleUserMenuOpen}>
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </Avatar>
              </IconButton>
            ) : (
              <IconButton color="inherit" component={Link} href="/auth/login">
                <PersonOutlineIcon />
              </IconButton>
            )}

            {/* Cart with badge */}
            <IconButton color="inherit" component={Link} href="/cart">
              <Badge badgeContent={cartCount} color="error">
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>

            {/* Drawer menu */}
            <IconButton
              color="inherit"
              onClick={() => setOpenDrawer(true)}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Dropdown for logged-in user */}
      <Menu
        anchorEl={anchorEl}
        open={isUserMenuOpen}
        onClose={handleUserMenuClose}
      >
        <MenuItem
          component={Link}
          href="/account/orders"
          onClick={handleUserMenuClose}
        >
          Đơn hàng của tôi
        </MenuItem>
        <MenuItem
          component={Link}
          href="/account/profile"
          onClick={handleUserMenuClose}
        >
          Thông tin tài khoản
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
      </Menu>

      <LussoDrawerMenu open={openDrawer} onClose={() => setOpenDrawer(false)} />
    </>
  );
}
