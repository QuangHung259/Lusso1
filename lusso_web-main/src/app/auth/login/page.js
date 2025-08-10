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
  Divider,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { login } = useAuth(); //

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );

      const { token, user } = res.data;

      //Lưu token và user vào context + localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      login(user, token);

      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Lỗi đăng nhập";
      setError(message);
    } finally {
      setLoading(false);
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
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h4"
              fontFamily="serif"
              letterSpacing={10}
              textAlign="center"
              sx={{ mb: 5 }}
            >
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
              {error && (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              )}
              <MuiLink
                component={Link}
                href="/auth/forgot-password"
                variant="body2"
                underline="hover"
                color="text.secondary"
                sx={{ alignSelf: "flex-start" }}
              >
                Quên mật khẩu?
              </MuiLink>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  bgcolor: "#222",
                  color: "white",
                  borderRadius: 0,
                  boxShadow: "none",
                  "&:hover": { bgcolor: "#000" },
                }}
              >
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
              <Divider sx={{ pt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Chưa có tài khoản?
                </Typography>
              </Divider>
              <Button
                component={Link}
                href="/auth/register"
                variant="outlined"
                fullWidth
                size="large"
                sx={{
                  py: 1.5,
                  color: "#222",
                  borderColor: "#222",
                  borderRadius: 0,
                  "&:hover": {
                    borderColor: "#000",
                    bgcolor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                Tạo tài khoản mới
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
