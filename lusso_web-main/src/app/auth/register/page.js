// app/auth/register/page.jsx or page.tsx
"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  Container,
  Stack,
  Paper,
  Alert,
} from "@mui/material";
import Link from "next/link";
import axios from "axios";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );
      setSuccess(res.data.message || "Đăng ký thành công");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại."
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 160px)",
        backgroundColor: "#fdfcf9",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            border: "1px solid #e0e0e0",
            borderRadius: 0,
            backgroundColor: "white",
          }}
        >
          <Typography
            variant="h4"
            fontFamily="serif"
            letterSpacing={10}
            textAlign="center"
            sx={{ mb: 5 }}
          >
            Tạo tài khoản
          </Typography>

          <Stack component="form" spacing={3} onSubmit={handleSubmit}>
            <Stack direction="row" spacing={2}>
              <TextField
                name="firstName"
                label="Họ"
                variant="standard"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <TextField
                name="lastName"
                label="Tên"
                variant="standard"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Stack>
            <TextField
              name="email"
              label="Email"
              type="email"
              variant="standard"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              name="password"
              label="Mật khẩu"
              type="password"
              variant="standard"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.password}
              onChange={handleChange}
              required
            />

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                py: 1.5,
                bgcolor: "#222",
                color: "white",
                borderRadius: 0,
                boxShadow: "none",
                "&:hover": { bgcolor: "#000" },
                mt: 2,
              }}
            >
              Đăng ký
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{ pt: 1 }}
            >
              Đã có tài khoản?{" "}
              <MuiLink
                component={Link}
                href="/auth/login"
                underline="hover"
                color="text.primary"
              >
                Đăng nhập
              </MuiLink>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
