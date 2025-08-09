// src/context/AuthContext.js
"use client";

import React, { createContext, useState, useContext } from 'react';

// Tạo Context
const AuthContext = createContext();

// Tạo custom hook để dễ sử dụng
export const useAuth = () => {
  return useContext(AuthContext);
};

// Tạo Provider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Sẽ lưu thông tin user ở đây

  // Hàm để giả lập việc đăng nhập
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    // Trong ứng dụng thực tế, đây là nơi bạn sẽ lưu token (ví dụ: vào cookie)
  };

  // Hàm để đăng xuất
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // Trong ứng dụng thực tế, đây là nơi bạn sẽ xóa token
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};