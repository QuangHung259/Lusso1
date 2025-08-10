"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { getOrders, deleteOrder, updateOrderStatus } from "@/lib/orderApi";

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      console.log("API getOrders response:", res.data); // <-- debug: xem cấu trúc trả về
      setOrders(res.data);
    } catch (err) {
      console.error("Lỗi lấy danh sách đơn hàng:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xoá đơn hàng này?")) return;
    try {
      await deleteOrder(id);
      fetchOrders();
    } catch (err) {
      console.error("Lỗi xoá đơn hàng:", err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      // cập nhật local để UI phản hồi nhanh, không cần fetch lại ngay
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
    } catch (err) {
      console.error("Lỗi cập nhật trạng thái:", err);
      // nếu cần, fallback: fetchOrders();
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Danh sách đơn hàng
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã đơn</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Tổng tiền</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
              <TableCell>Xem chi tiết</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const customerName =
                order.customerInfo?.name || order.user?.fullName || "—";
              const customerEmail =
                order.customerInfo?.email || order.user?.email || "—";
              const amount = Number(order.totalAmount ?? 0);

              return (
                <TableRow key={order._id}>
                  <TableCell>{order._id.slice(-6)}</TableCell>
                  <TableCell>{customerName}</TableCell>
                  <TableCell>{customerEmail}</TableCell>
                  <TableCell align="right">
                    {amount.toLocaleString("vi-VN")}₫
                  </TableCell>
                  <TableCell>
                    <Select
                      size="small"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <MenuItem value="pending">Chờ xác nhận</MenuItem>
                      <MenuItem value="processing">Đang xử lý</MenuItem>
                      <MenuItem value="shipped">
                        Đã giao cho đơn vị vận chuyển
                      </MenuItem>
                      <MenuItem value="delivered">Đã giao hàng</MenuItem>
                      <MenuItem value="canceled">Đã huỷ</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(order._id)}
                    >
                      Xoá
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      component={Link}
                      href={`/admin/orders/${order._id}`}
                      size="small"
                    >
                      Xem
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
