import axios from 'axios';
import { API_CONFIG } from './constants';
import { store } from '../store';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    try {
      // Get auth state directly from Redux store
      const authState = store.getState().auth;
      console.log('Interceptor - Auth State:', authState);

      if (authState?.token) {
        config.headers.Authorization = `Bearer ${authState.token}`;
        console.log('Interceptor - Setting Authorization Header:', config.headers.Authorization);
      } else {
        console.warn('Interceptor - No token found in auth state');
      }

      // Log final config
      console.log('Interceptor - Final Request Config:', {
        url: config.url,
        method: config.method,
        headers: config.headers,
      });

      return config;
    } catch (error) {
      console.error('Interceptor - Error setting auth header:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.error('Interceptor - Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('Interceptor - Response Success:', {
      status: response.status,
      url: response.config.url,
      method: response.config.method,
    });
    return response;
  },
  (error) => {
    console.error('Interceptor - Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
      headers: error.config?.headers,
    });
    return Promise.reject(error);
  }
);

// Export configured axios instance
export { api };