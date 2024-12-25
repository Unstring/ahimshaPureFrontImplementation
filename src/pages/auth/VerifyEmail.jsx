import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Logo from '../../components/common/Logo';
import api from '../../services/api.service';
import { loginSuccess } from '../../store/slices/authSlice';
import useTheme from '../../hooks/useTheme';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    if (token) {
      verifyEmail();
    } else {
      setError('Verification token is missing');
      setVerifying(false);
    }
  }, [token]);

  const verifyEmail = async () => {
    try {
      const response = await api.get(`/auth/verify-email/${token}`);
      dispatch(loginSuccess(response.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Email verification failed');
      setVerifying(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      await api.post('/auth/resend-verification');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend verification email');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <Logo className="h-12 w-auto mb-6" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Verify Your Email
          </h2>
          
          {verifying ? (
            <div className="mt-4 text-center">
              <div className="rounded-md bg-blue-50 dark:bg-blue-900 p-4">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Verifying your email...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="mt-4 text-center">
              <div className="rounded-md bg-red-50 dark:bg-red-900 p-4">
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  {error}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-4 text-center">
              <div className="rounded-md bg-green-50 dark:bg-green-900 p-4">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  A verification email has been sent to your email address.
                </p>
              </div>
            </div>
          )}
        </div>

        {!verifying && (
          <div className="mt-8 space-y-4">
            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
              Please check your email and click on the verification link to verify your account.
              If you haven't received the email, you can request a new one.
            </p>
            
            <div className="flex flex-col space-y-4">
              <button
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                onClick={handleResendVerification}
              >
                Resend Verification Email
              </button>

              <div className="flex items-center justify-between">
                <Link
                  to="/login"
                  className="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                >
                  Back to Login
                </Link>
                
                <Link
                  to="/contact"
                  className="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                >
                  Need Help?
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By verifying your email, you'll get access to all features and receive important updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail; 