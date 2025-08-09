import React from "react";
import {
  Drawer,
  List,
  ListItemButton, // Dùng ListItemButton
  ListItemText,
  IconButton,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link"; // Vẫn cần import Link

const menuItems = [
  { text: "Trang chủ", href: "/" },
  { text: "Cửa hàng", href: "/shop" },
  { text: "Bộ sưu tập", href: "/collections" },
  { text: "Hàng mới về", href: "/new-in" },
  { type: "divider" },
  { text: "Lookbook", href: "/lookbook" },
  { text: "Câu chuyện", href: "/#story-section" },
];

export default function LussoDrawerMenu({ open, onClose }) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 300,
          bgcolor: "#ffffff",
          boxShadow: 4,
        },
      }}
    >
      <Box sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ flexGrow: 1 }}>
          {menuItems.map((item, index) =>
            item.type === "divider" ? (
              <Divider sx={{ my: 2 }} key={index} />
            ) : (
              // === ĐÂY LÀ THAY ĐỔI CHÍNH ===
              // Biến ListItemButton thành một component Link
              <ListItemButton
                key={item.text}
                component={Link} // Ra lệnh cho MUI render ra component Link
                href={item.href}  // Truyền href vào trực tiếp
                onClick={onClose}
                sx={{
                  py: 1.5,
                  "& .MuiListItemText-primary": {
                    fontFamily: "serif",
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#111",
                    transition: "letter-spacing 0.3s ease",
                  },
                  "&:hover .MuiListItemText-primary": {
                    letterSpacing: "0.5px",
                  },
                }}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            )
          )}
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary" textAlign="center">
          © {new Date().getFullYear()} LUSSO
        </Typography>
      </Box>
    </Drawer>
  );
}