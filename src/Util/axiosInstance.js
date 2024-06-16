// src/axiosInstance.js

import axios from "axios";

// Create an instance of axios with default settings
const axiosInstance = axios.create({
  // baseURL: "http://abduls-macbook-pro.local:5001", // Replace with your API's base URL
  baseURL: "http://0.0.0.0:5001", // Replace with your API's base URL
  // baseURL: "https://5536-2601-647-4502-15a0-e0b6-b51f-f20e-b788.ngrok-free.app", // Replace with your API's base URL
  timeout: 10000, // Timeout after 10 seconds
  headers: {
    "Content-Type": "application/json",
    // 'Authorization': 'Bearer YOUR_TOKEN' // Add Authorization if needed
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the config before sending the request
    // For example, adding authentication tokens
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx causes this function to trigger
    if (error.response) {
      // Handle specific status codes, like redirecting to login on 401
      if (error.response.status === 401) {
        // For example, redirect to login
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

// Example utility function for making API requests
export const apiRequest = async (method, url, data = {}, options = {}) => {
  const config = {
    method,
    url,
    data,
    // ...options, // Spread additional options such as headers
  };

  try {
    const response = await axiosInstance(config);
    return response.data;
  } catch (error) {
    // Handle errors here or throw them to be handled in the calling function
    console.error("API Request Error:", error);
    throw error;
  }
};

export default axiosInstance;
