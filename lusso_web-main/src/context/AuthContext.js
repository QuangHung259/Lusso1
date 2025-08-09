"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// ❌ Xóa dòng import { useAuth } from "@/context/AuthContext";

// Tạo Context
const AuthContext = createContext();

// Custom hook để dễ sử dụng
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Hàm lấy thông tin user từ API
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(res.data.user);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Lỗi khi lấy thông tin người dùng:", err);
        setUser(null);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  // Hàm đăng nhập
  const login = (userData, token) => {
    if (token) localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Hàm đăng xuất
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  // Lấy thông tin user khi load trang
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
