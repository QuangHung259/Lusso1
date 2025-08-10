// lib/orderApi.js
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

const token = () =>
  typeof window !== "undefined" && localStorage.getItem("token");

export const getOrders = () =>
  axios.get(`${API}/orders`, {
    headers: { Authorization: `Bearer ${token()}` },
  });

export const getOrderById = (id) =>
  axios.get(`${API}/orders/${id}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });

export const deleteOrder = (id) =>
  axios.delete(`${API}/orders/${id}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });

export const updateOrderStatus = (id, status) =>
  axios.put(
    `${API}/orders/${id}`,
    { status },
    {
      headers: { Authorization: `Bearer ${token()}` },
    }
  );



