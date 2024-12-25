import { useState, useEffect, useRef } from 'react';

const PasswordInput = ({ value, onChange, disabled = false, showHints = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const [passwordStrength, setPasswordStrength] = useState({
    minLength: false,
    hasLower: false,
    hasUpper: false,
    hasNumber: false,
    hasSpecial: false
  });

  useEffect(() => {
    if (showHints) {
      setPasswordStrength({
        minLength: value.length >= 6,
        hasLower: /[a-z]/.test(value),
        hasUpper: /[A-Z]/.test(value),
        hasNumber: /[0-9]/.test(value),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value)
      });
    }
  }, [value, showHints]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const CheckIcon = () => (
    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  const CrossIcon = () => (
    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"></path>
      <path d="m6 6 12 12"></path>
    </svg>
  );

  return (
    <div className="relative" ref={inputRef}>
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600"
        required
        value={value}
        onChange={onChange}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 end-0 flex items-center px-4 text-gray-600 dark:text-gray-400"
      >
        {showPassword ? (
          <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        ) : (
          <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
        )}
      </button>

      {showHints && isFocused && (
        <div className="absolute z-10 w-full bg-white shadow-md rounded-lg p-4 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700">
          <div className="flex mt-2 -mx-1">
            {Object.values(passwordStrength).filter(Boolean).length > 0 && (
              Array(5).fill(0).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-auto rounded-full mx-1 ${
                    index < Object.values(passwordStrength).filter(Boolean).length
                      ? 'bg-teal-500'
                      : 'bg-blue-500 opacity-50'
                  }`}
                />
              ))
            )}
          </div>

          <h4 className="mt-3 text-sm font-semibold text-gray-800 dark:text-white">
            Your password must contain:
          </h4>

          <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-500">
            <li className={`flex items-center gap-x-2 ${passwordStrength.minLength ? 'text-teal-500' : ''}`}>
              {passwordStrength.minLength ? <CheckIcon /> : <CrossIcon />}
              Minimum 6 characters
            </li>
            <li className={`flex items-center gap-x-2 ${passwordStrength.hasLower ? 'text-teal-500' : ''}`}>
              {passwordStrength.hasLower ? <CheckIcon /> : <CrossIcon />}
              Lowercase letter
            </li>
            <li className={`flex items-center gap-x-2 ${passwordStrength.hasUpper ? 'text-teal-500' : ''}`}>
              {passwordStrength.hasUpper ? <CheckIcon /> : <CrossIcon />}
              Uppercase letter
            </li>
            <li className={`flex items-center gap-x-2 ${passwordStrength.hasNumber ? 'text-teal-500' : ''}`}>
              {passwordStrength.hasNumber ? <CheckIcon /> : <CrossIcon />}
              Number
            </li>
            <li className={`flex items-center gap-x-2 ${passwordStrength.hasSpecial ? 'text-teal-500' : ''}`}>
              {passwordStrength.hasSpecial ? <CheckIcon /> : <CrossIcon />}
              Special character
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordInput; 