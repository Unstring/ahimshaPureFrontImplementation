import api from './api.service';
import { API_CONFIG } from '../config/api.config';

class AuthService {
  async login(credentials) {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  }

  async register(userData) {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  }

  async logout() {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  }

  async refreshToken(refreshToken) {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN, {
      refreshToken,
    });
    return response.data;
  }

  async requestEmailVerification(email) {
    const response = await api.post('/auth/request-verification', { email });
    return response.data;
  }

  async verifyEmail(token) {
    const response = await api.get(`/auth/verify-email/${token}`);
    return response.data;
  }
}

const authService = new AuthService();
export { authService }; 