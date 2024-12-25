import React, { useRef, useEffect } from 'react';

const PinInput = ({ length = 6, value = '', onChange, disabled = false }) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    // Pre-fill refs array
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!e.target.value && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleChange = (e, index) => {
    const newValue = e.target.value;
    if (newValue.length > 1) return; // Prevent multiple digits

    // Only allow numbers
    if (!/^\d*$/.test(newValue)) return;

    // Update the value
    const newPinValue = value.split('');
    newPinValue[index] = newValue;
    onChange(newPinValue.join(''));

    // Move to next input if value is entered
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    if (!/^\d*$/.test(pastedData)) return; // Only allow numbers

    onChange(pastedData.padEnd(length, ''));
    
    // Fill inputs and focus the next empty input
    const nextEmptyIndex = pastedData.length;
    if (nextEmptyIndex < length) {
      inputRefs.current[nextEmptyIndex]?.focus();
    }
  };

  return (
    <div className="flex gap-x-3">
      {Array(length).fill(0).map((_, index) => (
        <input
          key={index}
          type="text"
          ref={el => inputRefs.current[index] = el}
          className="block w-[38px] h-[38px] text-center border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
          maxLength={1}
          placeholder="⚬"
          value={value[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default PinInput; 