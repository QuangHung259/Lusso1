// context/AuthContext.js
"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const fetchUser = async () => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) {
      setToken(savedToken);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
          { headers: { Authorization: `Bearer ${savedToken}` } }
        );
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user)); // update user
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Lỗi khi lấy thông tin người dùng:", err);
        setUser(null);
        setIsAuthenticated(false);
        setToken(null);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  const login = (userData, newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
      setToken(newToken);
    }
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, login, logout, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
