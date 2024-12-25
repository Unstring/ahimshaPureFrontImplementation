import React from 'react';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

export const showToast = (message, type = 'default') => {
  const toastConfig = {
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    className: getToastClass(type),
  };

  Toastify(toastConfig).showToast();
};

const getToastClass = (type) => {
  switch (type) {
    case 'success':
      return 'max-w-xs bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500';
    case 'error':
      return 'max-w-xs bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg dark:bg-red-800/10 dark:border-red-900 dark:text-red-500';
    case 'warning':
      return 'max-w-xs bg-yellow-100 border border-yellow-200 text-sm text-yellow-800 rounded-lg dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500';
    case 'info':
      return 'max-w-xs bg-blue-100 border border-blue-200 text-sm text-blue-800 rounded-lg dark:bg-blue-800/10 dark:border-blue-900 dark:text-blue-500';
    case 'gray':
      return 'max-w-xs bg-gray-50 border border-gray-200 text-sm text-gray-600 rounded-lg dark:bg-white/10 dark:border-white/10 dark:text-neutral-400';
    default:
      return 'max-w-xs bg-gray-100 border border-gray-200 text-sm text-gray-800 rounded-lg dark:bg-white/10 dark:border-white/20 dark:text-white';
  }
};

export const Toast = {
  success: (message) => showToast(message, 'success'),
  error: (message) => showToast(message, 'error'),
  warning: (message) => showToast(message, 'warning'),
  info: (message) => showToast(message, 'info'),
  gray: (message) => showToast(message, 'gray'),
  default: (message) => showToast(message, 'default')
};

export default Toast; 