import { api } from '../config/api.config';
import { API_CONFIG, API_ENDPOINTS } from '../config/constants';
import { store } from '../store';

export const bannerService = {
  getAllBanners: async () => {
    console.log('BannerService - getAllBanners - Starting request');
    console.log('BannerService - Current Auth State:', store.getState().auth);
    
    try {
      const response = await api.get(API_ENDPOINTS.BANNERS.LIST);
      console.log('BannerService - getAllBanners - Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('BannerService - getAllBanners - Error:', error);
      throw error;
    }
  },

  getActiveBanners: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.BANNERS.ACTIVE);
      return response.data;
    } catch (error) {
      console.error('Error fetching active banners:', error);
      throw error;
    }
  },

  getBanner: async (uuid) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.BANNERS.DETAIL}/${uuid}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching banner:', error);
      throw error;
    }
  },

  createBanner: async (bannerData) => {
    console.log('BannerService - createBanner - Starting request with data:', bannerData);
    try {
      const response = await api.post(API_ENDPOINTS.BANNERS.CREATE, bannerData);
      console.log('BannerService - createBanner - Success:', response.data);
      return response.data;
    } catch (error) {
      console.error('BannerService - createBanner - Error:', error);
      throw error;
    }
  },

  updateBanner: async (uuid, bannerData) => {
    try {
      const response = await api.put(`${API_ENDPOINTS.BANNERS.UPDATE}/${uuid}`, bannerData);
      return response.data;
    } catch (error) {
      console.error('Error updating banner:', error);
      throw error;
    }
  },

  deleteBanner: async (uuid) => {
    try {
      const response = await api.delete(`${API_ENDPOINTS.BANNERS.DELETE}/${uuid}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting banner:', error);
      throw error;
    }
  },

  toggleBannerStatus: async (uuid) => {
    try {
      const response = await api.patch(`${API_ENDPOINTS.BANNERS.TOGGLE}/${uuid}`);
      return response.data;
    } catch (error) {
      console.error('Error toggling banner status:', error);
      throw error;
    }
  },

  // Local storage utilities
  clearBannerDismissState: (bannerId) => {
    try {
      localStorage.removeItem(`banner-${bannerId}-dismissed`);
    } catch (error) {
      console.error('Error clearing banner dismiss state:', error);
    }
  },

  isBannerDismissed: (bannerId) => {
    try {
      return localStorage.getItem(`banner-${bannerId}-dismissed`) === 'true';
    } catch (error) {
      console.error('Error checking banner dismiss state:', error);
      return false;
    }
  }
};

export default bannerService; 