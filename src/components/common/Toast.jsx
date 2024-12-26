import React from 'react';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import "./toast.css";

function createToastMarkup(message, type) {
  const labelId = `hs-toast-soft-color-${type}-label`;
  return `
    <div class="${getToastClass(type)}" role="alert" tabindex="-1" aria-labelledby="${labelId}">
      <div id="${labelId}" class="flex p-4">
        ${message}
        <div class="ms-auto">
          <button type="button" onclick="this.closest('.toastify').querySelector('.toast-close').click()" 
            class="inline-flex shrink-0 justify-center items-center size-5 rounded-lg ${getCloseButtonClass(type)}" 
            aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

function getToastClass(type) {
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
}

function getCloseButtonClass(type) {
  switch (type) {
    case 'success':
      return 'text-teal-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-teal-200';
    case 'error':
      return 'text-red-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-red-200';
    case 'warning':
      return 'text-yellow-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-yellow-200';
    case 'info':
      return 'text-blue-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-blue-200';
    case 'gray':
      return 'text-gray-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-white';
    default:
      return 'text-gray-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-white';
  }
}

export const showToast = (message, type = 'default') => {
  const toastConfig = {
    text: createToastMarkup(message, type),
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    className: "toast-container",
    offset: {
      x: 0, // horizontal axis - can be a number
      y: 15 // vertical axis - can be a number
    },
    escapeMarkup: false,
  };

  Toastify(toastConfig).showToast();
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