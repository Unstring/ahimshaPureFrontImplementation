import api from './api.service';
import { API_CONFIG } from '../config/api.config';

export const userService = {
  getProfile: async () => {
    const response = await api.get(API_CONFIG.ENDPOINTS.USER.PROFILE);
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put(
      API_CONFIG.ENDPOINTS.USER.UPDATE_PROFILE,
      userData
    );
    return response.data;
  },
}; 