"use client";

import React from 'react';
import { Box, Container, Typography, Paper, Stack, Divider, Chip, Button } from '@mui/material';
import { useOrders } from '@/context/OrderContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Tên function phải viết hoa: OrdersPage
export default function OrdersPage() {
    const { orders } = useOrders();
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    // Bảo vệ trang: Nếu chưa đăng nhập, chuyển về trang login
    React.useEffect(() => {
        // Thêm một độ trễ nhỏ để AuthContext có thời gian khởi tạo
        const timer = setTimeout(() => {
            if (!isAuthenticated) {
                router.replace('/login');
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null; // Hoặc một spinner loading
    }

    return (
        <Box sx={{ backgroundColor: '#fdfcf9', py: { xs: 4, md: 8 }, minHeight: '70vh' }}>
            <Container maxWidth="md">
                <Typography variant="h3" fontFamily="serif" sx={{ mb: 5 }}>
                    Đơn hàng của tôi
                </Typography>

                {orders.length === 0 ? (
                    <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', bgcolor: 'transparent', borderRadius: 0 }}>
                        <Typography sx={{ mb: 2 }}>Bạn chưa có đơn hàng nào.</Typography>
                        <Button component={Link} href="/shop" variant="contained" sx={{ bgcolor: '#222', '&:hover': { bgcolor: '#000' }}}>
                            Bắt đầu mua sắm
                        </Button>
                    </Paper>
                ) : (
                    <Stack spacing={4}>
                        {orders.map(order => (
                            <Paper key={order.id} variant="outlined" sx={{ p: { xs: 2, md: 3 }, borderRadius: 0, bgcolor: 'transparent' }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                    <Box>
                                        <Typography fontWeight={600}>Đơn hàng #{order.id.slice(0, 8).toUpperCase()}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Ngày đặt: {new Date(order.date).toLocaleDateString('vi-VN')}
                                        </Typography>
                                    </Box>
                                    <Chip label={order.status} color={order.status === 'Đang xử lý' ? 'warning' : 'success'} size="small" />
                                </Stack>
                                <Divider sx={{ mb: 2 }} />
                                <Stack spacing={2}>
                                    {order.items.map(item => (
                                        <Box key={`${item.id}-${item.size}-${item.color}`} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                            <Box sx={{ position: 'relative', width: 60, height: 75, bgcolor: '#f5f5f5', flexShrink: 0 }}>
                                                <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" />
                                            </Box>
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Typography fontWeight={500}>{item.name}</Typography>
                                                <Typography variant="body2" color="text.secondary">SL: {item.quantity}</Typography>
                                            </Box>
                                            <Typography fontWeight={500} sx={{ whiteSpace: 'nowrap' }}>
                                                {(item.price * item.quantity).toLocaleString("vi-VN", { currency: "VND" })}₫
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>
                                <Divider sx={{ my: 2 }} />
                                <Typography textAlign="right" fontWeight={600} variant="h6">
                                    Tổng cộng: {order.total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                </Typography>
                            </Paper>
                        ))}
                    </Stack>
                )}
            </Container>
        </Box>
    );
}