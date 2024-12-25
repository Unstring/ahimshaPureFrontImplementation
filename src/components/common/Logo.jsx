import React from 'react';

const Logo = ({ className = "w-8 h-8" }) => (
  <svg 
    className={className} 
    viewBox="26 89 1129 825" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      fill="#bf282e" 
      fillRule="evenodd" 
      d="M465 365v431l103 59 103 59 1-412V89H465v276M240 91c-37 4-60 29-60 65 0 22 8 41 23 55 8 8 13 11 25 15 8 3 10 3 21 3 17 1 29-3 43-14 8-7 15-16 20-26 6-13 6-16 6-59V91l-36-1-42 1m583 0-6 1-1 304 1 306a296 296 0 0 0 264-107 323 323 0 0 0 72-165 414 414 0 0 0-7-105 4333 4333 0 0 1-14-43l-2-6a325 325 0 0 0-92-120 423 423 0 0 0-47-30 316 316 0 0 0-168-35M202 314a191 191 0 0 0-146 89 217 217 0 0 0-29 77 309 309 0 0 0 3 71 214 214 0 0 0 32 71 206 206 0 0 0 118 78c12 3 18 4 79 4h62V522c0-171 0-181-2-182-6-5-36-18-53-22-18-4-45-6-64-4"
    />
  </svg>
);

export default Logo; 