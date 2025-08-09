// lib/shippingApi.js
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

// Lấy token từ localStorage nếu đang ở client
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Config header với token
const getAuthHeader = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// GET: Lấy tất cả thông tin vận chuyển
export const getAllShipping = async () => {
  return axios.get(`${API}/shipping`, getAuthHeader());
};

// GET: Lấy thông tin vận chuyển theo orderId
export const getShippingByOrderId = async (orderId) => {
  return axios.get(`${API}/shipping/order/${orderId}`, getAuthHeader());
};

// POST: Tạo mới thông tin vận chuyển
export const createShipping = async (data) => {
  return axios.post(`${API}/shipping`, data, getAuthHeader());
};

// PUT: Cập nhật thông tin vận chuyển
export const updateShipping = async (shippingId, data) => {
  return axios.put(`${API}/shipping/${shippingId}`, data, getAuthHeader());
};

// DELETE: Xóa thông tin vận chuyển
export const deleteShipping = async (shippingId) => {
  return axios.delete(`${API}/shipping/${shippingId}`, getAuthHeader());
};
