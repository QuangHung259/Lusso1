//src/context/CartContext.js
"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Tạo Context
const CartContext = createContext();

// 2. Tạo một custom Hook để sử dụng Context dễ dàng hơn
export const useCart = () => {
  return useContext(CartContext);
};

// 3. Tạo Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Lấy dữ liệu giỏ hàng từ localStorage khi component được mount lần đầu
  useEffect(() => {
    try {
      const items = localStorage.getItem('cartItems');
      if (items) {
        setCartItems(JSON.parse(items));
      }
    } catch (error) {
      console.error("Failed to parse cart items from localStorage", error);
      localStorage.removeItem('cartItems'); // Xóa dữ liệu lỗi
    }
  }, []);

  // Lưu dữ liệu giỏ hàng vào localStorage mỗi khi nó thay đổi
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // --- CÁC HÀM XỬ LÝ GIỎ HÀNG ---

  const addToCart = (product, quantity, size, color) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id === product.id && item.size === size && item.color === color
      );

      if (existingItem) {
        // Nếu sản phẩm đã có, chỉ cập nhật số lượng
        return prevItems.map(item =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
        return [...prevItems, { ...product, quantity, size, color }];
      }
    });
  };

  const updateQuantity = (productId, size, color, amount) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.size === size && item.color === color
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const removeFromCart = (productId, size, color) => {
    setCartItems(prevItems =>
      prevItems.filter(item =>
        !(item.id === productId && item.size === size && item.color === color)
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Giá trị mà Provider sẽ cung cấp cho các component con
  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount: cartItems.reduce((count, item) => count + item.quantity, 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};