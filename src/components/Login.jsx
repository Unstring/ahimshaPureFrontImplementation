import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { login, googleAuthSignIn, appleAuth } from '../services/authService';
import Toast from './common/Toast';
import PasswordInput from './common/PasswordInput';
import { initGoogleAuth, initAppleAuth } from '../services/socialAuthService';

const Login = () => {
  const { login: authLogin } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if Google Client ID is available
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    console.log('Environment check - Google Client ID:', clientId ? 'Present' : 'Missing');
    
    // Check if Google API is loaded
    console.log('Google API check:', window.google ? 'Loaded' : 'Not loaded');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await login(formData);
      const success = await authLogin(response);
      
      if (!success) {
        throw new Error('Login failed');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      Toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    console.log('Starting Google Auth...');
    setError('');
    setIsLoading(true);
    
    try {
      console.log('Initializing Google One Tap...');
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (response) => {
          console.log('Received credential response:', response);
          try {
            if (!response.credential) {
              throw new Error('No credential received from Google');
            }
            
            console.log('Got token, calling backend...');
            const authResponse = await googleAuthSignIn(response.credential);
            console.log('Backend response:', authResponse);
            
            if (authResponse.status === 'success') {
              const success = await authLogin(authResponse);
              if (!success) {
                throw new Error('Login failed');
              }
              Toast.success('Login successful!');
            } else {
              throw new Error(authResponse.message || 'Login failed');
            }
          } catch (err) {
            console.error('Google Auth Response Error:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Google sign in failed';
            Toast.error(errorMessage);
            setError(errorMessage);
          } finally {
            setIsLoading(false);
          }
        },
        auto_select: false,
      });

      // Calculate button width
      const buttonElement = document.getElementById('googleButton');
      const buttonWidth = buttonElement ? buttonElement.offsetWidth - 35 : 320;

      // Check theme preference from localStorage first, then system preference
      const storedTheme = localStorage.getItem('hs_theme');
      const isDarkMode = storedTheme === 'dark' || 
        (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);

      // Render the button with calculated width and theme
      google.accounts.id.renderButton(
        buttonElement,
        { 
          theme: isDarkMode ? 'filled_black' : 'outline', 
          size: 'large',
          width: buttonWidth,
          text: 'signin_with'
        }
      );
      
      // Optionally prompt One Tap
      google.accounts.id.prompt((notification) => {
        console.log('Google One Tap prompt notification:', notification);
      });

    } catch (err) {
      console.error('Google Auth Error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Google sign in failed';
      Toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleAuth = async () => {
    setError('');
    setIsLoading(true);
    
    try {
      const appleAuth = await initAppleAuth();
      const data = await appleAuth.signIn();
      const token = data.authorization.id_token;
      
      const response = await appleAuth(token);
      const success = await authLogin(response);
      
      if (!success) {
        throw new Error('Apple sign in failed');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Apple sign in failed';
      Toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="mt-7 border border-gray-200 rounded-xl shadow-sm dark:border-gray-700 max-w-md mx-auto">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Don't have an account yet?
              <Link 
                to="/signup" 
                className="ml-1 text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
              >
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            {/* Social Sign In Buttons */}
            <div className="grid gap-y-4">
              {/* Google Sign In Button */}
              <button
                id="googleButton"
                type="button"
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:bg-gray-800"
              >
                <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                  <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4"/>
                  <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853"/>
                  <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05"/>
                  <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335"/>
                </svg>
                Sign in with Google
              </button>

              {/* Apple Sign In Button */}
              <button
                type="button"
                onClick={handleAppleAuth}
                disabled={isLoading}
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:bg-gray-800"
              >
                <svg className="w-4 h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                Sign in with Apple
              </button>
            </div>

            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
              Or
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                {/* Email */}
                <div>
                  <div className="flex justify-between items-center">
                    <label htmlFor="email" className="block text-sm mb-2 dark:text-white">
                      Email address
                    </label>
                    <Link
                      to="/verify-email"
                      className="text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                    >
                      Verify email
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600"
                      required
                      aria-describedby="email-error"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="block text-sm mb-2 dark:text-white">
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <PasswordInput
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={isLoading}
                    showHints={true}
                  />
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <div className="flex">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="remember-me" className="text-sm dark:text-white">
                      Remember me
                    </label>
                  </div>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="text-sm text-red-600 dark:text-red-500">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-offset-gray-800"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin inline-block size-4 border-[2px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 