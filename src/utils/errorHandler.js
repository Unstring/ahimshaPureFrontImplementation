export const handleError = (error) => {
  // Log error to monitoring service (e.g., Sentry)
  console.error('Error:', error);

  // Handle different types of errors
  if (error.response) {
    // Server responded with error
    switch (error.response.status) {
      case 401:
        return 'Unauthorized access';
      case 404:
        return 'Resource not found';
      case 500:
        return 'Internal server error';
      default:
        return 'An error occurred';
    }
  } else if (error.request) {
    // Request made but no response
    return 'Network error';
  } else {
    // Other errors
    return error.message;
  }
}; 