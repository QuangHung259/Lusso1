import axios from "axios";

// Lấy URL từ biến môi trường
const API = process.env.NEXT_PUBLIC_API_URL;

// Hàm lấy token từ localStorage
const token = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const getProducts = () => axios.get(`${API}/products`);

export const getProductById = (id) => axios.get(`${API}/products/${id}`);

export const createProduct = (data) =>
  axios.post(`${API}/products`, data, {
    headers: { Authorization: `Bearer ${token()}` },
  });

export const updateProduct = (id, data) =>
  axios.put(`${API}/products/${id}`, data, {
    headers: { Authorization: `Bearer ${token()}` },
  });

export const deleteProduct = (id) =>
  axios.delete(`${API}/products/${id}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });

export const uploadImage = (formData) =>
  axios.post(`${API}/products/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token()}`,
    },
  });

// API Categories
export const getCategories = () => axios.get(`${API}/categories`);
