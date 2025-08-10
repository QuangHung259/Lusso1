"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
  Chip,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import Image from "next/image";
import { getOrderById, updateOrderStatus } from "@/lib/orderApi";

export default function OrderDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrderById(id);
        setOrder(res.data);
        setStatus(res.data.status);
      } catch (err) {
        console.error("Lỗi lấy chi tiết đơn hàng:", err);
      }
    };
    if (id) fetchOrder();
  }, [id]);

  const handleUpdateStatus = async () => {
    try {
      await updateOrderStatus(id, { status });
      alert("Cập nhật trạng thái thành công!");
      router.refresh();
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
    }
  };

  if (!order) return <Typography>Đang tải...</Typography>;

  return (
    <Box sx={{ backgroundColor: "#fdfcf9", py: 4 }}>
      <Box maxWidth="md" sx={{ margin: "0 auto" }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Chi tiết đơn hàng #{order._id.slice(-6)}
        </Typography>

        <Paper variant="outlined" sx={{ p: 3, mb: 4, bgcolor: "transparent" }}>
          <Typography fontWeight={600}>Thông tin khách hàng</Typography>
          <Typography>Tên: {order.customerInfo?.name}</Typography>
          <Typography>Email: {order.customerInfo?.email}</Typography>
          <Typography>SĐT: {order.customerInfo?.phone}</Typography>
          <Typography>
            Địa chỉ: {order.customerInfo?.address}, {order.customerInfo?.district},{" "}
            {order.customerInfo?.city}
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Stack direction="row" alignItems="center" spacing={2}>
            <Chip
              label={status}
              color={
                status === "pending"
                  ? "warning"
                  : status === "processing"
                  ? "info"
                  : status === "shipped"
                  ? "primary"
                  : status === "delivered"
                  ? "success"
                  : "error"
              }
            />
            <Select
              size="small"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="pending">Chờ xử lý</MenuItem>
              <MenuItem value="processing">Đang xử lý</MenuItem>
              <MenuItem value="shipped">Đã giao cho đơn vị vận chuyển</MenuItem>
              <MenuItem value="delivered">Đã giao</MenuItem>
              <MenuItem value="canceled">Đã hủy</MenuItem>
            </Select>
            <Button variant="contained" onClick={handleUpdateStatus}>
              Lưu trạng thái
            </Button>
          </Stack>
        </Paper>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Danh sách sản phẩm
        </Typography>
        <Paper variant="outlined" sx={{ p: 3, bgcolor: "transparent" }}>
          <Stack spacing={2}>
            {order.products.map((item, idx) => (
              <Box
                key={idx}
                sx={{ display: "flex", gap: 2, alignItems: "center" }}
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
                    src={item.image || item.product?.image || "/placeholder.jpg"}
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
                <Typography fontWeight={500} sx={{ whiteSpace: "nowrap" }}>
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
      </Box>
    </Box>
  );
}
