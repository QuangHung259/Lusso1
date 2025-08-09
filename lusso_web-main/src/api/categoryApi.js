// src/api/categoryApi.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/categories"; // đổi sang URL API thật

export const getCategories = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
