// API Base URLs
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.ahimsapure.com/api/v1',
  TIMEOUT: 30000,
  API_KEY: import.meta.env.VITE_API_KEY,
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification',
    FORGOT_PASSWORD: '/auth/forgot-password',
    VERIFY_RESET_CODE: '/auth/verify-reset-code',
    RESET_PASSWORD: '/auth/reset-password',
    EMAIL_VERIFICATION: '/auth/verify-email',
    GOOGLE_SIGNUP: '/auth/google/signup',
    GOOGLE_SIGNIN: '/auth/google/signin',
    GOOGLE: '/auth/google',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile/update',
  },
  PRODUCTS: {
    LIST: '/products',
    DETAILS: '/products/:id',
  },
  ORDERS: {
    LIST: '/orders',
    CREATE: '/orders/create',
    DETAILS: '/orders/:id',
  },
  FILES: {
    PUBLIC_KEY: '/files/applicationpublickey',
  },
  BANNERS: {
    LIST: '/banners',
    ACTIVE: '/banners/active',
    DETAIL: '/banners',
    CREATE: '/banners',
    UPDATE: '/banners',
    DELETE: '/banners',
    TOGGLE: '/banners/toggle'
  },
};

// External URLs
export const EXTERNAL_URLS = {
  SOCIAL: {
    TWITTER: 'https://twitter.com/ahimsapure',
    INSTAGRAM: 'https://instagram.com/ahimsapure',
    LINKEDIN: 'https://linkedin.com/company/ahimsapure',
    FACEBOOK: 'https://facebook.com/ahimsapure',
  },
  COMPANY: {
    WEBSITE: 'https://ahimsapure.com',
    SUPPORT_EMAIL: 'contact@ahimsapure.com',
  },
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PRODUCTS: '/products',
  CONTACT: '/contact',
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
    VERIFY_EMAIL: '/verify-email',
  },
  DASHBOARD: {
    ROOT: '/dashboard',
    PROFILE: '/dashboard/profile',
    ORDERS: '/dashboard/orders',
  },
  LEGAL: {
    TERMS: '/terms',
    PRIVACY: '/privacy',
    REFUND: '/refund',
  },
  FAQ: '/faq',
  SETTINGS: {
    ROOT: '/settings',
    BANNERS: '/settings/banners',
  },
}; 