// src/context/OrderContext.js
"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Cần cài thư viện uuid: npm install uuid

const OrderContext = createContext();

export const useOrders = () => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  // Lấy danh sách đơn hàng từ localStorage khi khởi động
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Lưu lại danh sách đơn hàng vào localStorage mỗi khi có thay đổi
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: uuidv4(), // Tạo một ID duy nhất cho đơn hàng
      date: new Date().toISOString(), // Thêm ngày đặt hàng
      status: 'Đang xử lý', // Thêm trạng thái đơn hàng
    };
    setOrders(prevOrders => [newOrder, ...prevOrders]); // Thêm đơn hàng mới lên đầu danh sách
  };

  const value = {
    orders,
    addOrder,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};  