import React from 'react';

const Logo = ({ className }) => (
  <svg 
    viewBox="0 0 200 50" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20z"
      fill="currentColor"
    />
    <text
      x="60"
      y="30"
      fill="currentColor"
      fontSize="24"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
    >
      GheeStore
    </text>
  </svg>
);

export default Logo; 