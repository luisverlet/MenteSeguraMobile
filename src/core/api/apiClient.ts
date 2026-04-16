import axios from 'axios';
import { useAuthStore } from '../../store/auth/useAuthStore'; // Or wherever auth is stored

// Replace with your actual backend URL when provided
const BASE_URL = 'https://api.example.com'; 

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add interceptors to automatically attach tokens if needed
apiClient.interceptors.request.use(
  (config) => {
    // Basic example of getting a token from Zustand (may need adjustments based on persistence)
    const token = useAuthStore.getState().user?.role; // Adjust property as needed based on actual token storage
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors, e.g., 401 Unauthorized -> Logout
    if (error.response?.status === 401) {
      // useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
