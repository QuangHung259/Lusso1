"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Divider,
  Chip,
  Button,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function OrdersPage() {
  const { isAuthenticated, token } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Redirect nếu chưa login
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  // Fetch orders từ API
  React.useEffect(() => {
    if (!isAuthenticated) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/my-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Không thể tải đơn hàng");
        }

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, token]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#fdfcf9",
        py: { xs: 4, md: 8 },
        minHeight: "70vh",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" fontFamily="serif" sx={{ mb: 5 }}>
          Đơn hàng của tôi
        </Typography>

        {orders.length === 0 ? (
          <Paper
            variant="outlined"
            sx={{
              p: 4,
              textAlign: "center",
              bgcolor: "transparent",
              borderRadius: 0,
            }}
          >
            <Typography sx={{ mb: 2 }}>Bạn chưa có đơn hàng nào.</Typography>
            <Button
              component={Link}
              href="/shop"
              variant="contained"
              sx={{ bgcolor: "#222", "&:hover": { bgcolor: "#000" } }}
            >
              Bắt đầu mua sắm
            </Button>
          </Paper>
        ) : (
          <Stack spacing={4}>
            {orders.map((order) => (
              <Paper
                key={order._id}
                variant="outlined"
                sx={{
                  p: { xs: 2, md: 3 },
                  borderRadius: 0,
                  bgcolor: "transparent",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Box>
                    <Typography fontWeight={600}>
                      Đơn hàng #{order._id.slice(0, 8).toUpperCase()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ngày đặt:{" "}
                      {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                    </Typography>
                  </Box>
                  <Chip
                    label={order.status}
                    color={
                      order.status === "pending"
                        ? "warning"
                        : order.status === "canceled"
                        ? "error"
                        : "success"
                    }
                    size="small"
                  />
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={2}>
                  {order.products.map((item, idx) => (
                    <Box
                      key={`${item.product?._id}-${idx}`}
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: 60,
                          height: 75,
                          bgcolor: "#f5f5f5",
                          flexShrink: 0,
                        }}
                      >
                        <Image
                          src={
                            item.image ||
                            item.product?.image ||
                            "/placeholder.png"
                          }
                          alt={item.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography fontWeight={500}>{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          SL: {item.quantity}
                        </Typography>
                      </Box>
                      <Typography
                        fontWeight={500}
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                      </Typography>
                    </Box>
                  ))}
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Typography textAlign="right" fontWeight={600} variant="h6">
                  Tổng cộng:{" "}
                  {order.totalAmount.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Typography>
              </Paper>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}
