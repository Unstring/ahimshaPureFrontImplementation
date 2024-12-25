import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { API_CONFIG, API_ENDPOINTS } from '../../config/constants';
import Toast from '../../components/common/Toast';

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [failureCountdown, setFailureCountdown] = useState(2);
  const [verificationStatus, setVerificationStatus] = useState({
    isLoading: true,
    isSuccess: false,
    message: ''
  });

  // Handle success countdown and redirect
  useEffect(() => {
    if (verificationStatus.isSuccess && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (verificationStatus.isSuccess && countdown === 0) {
      navigate('/login');
    }
  }, [countdown, verificationStatus.isSuccess, navigate]);

  // Handle failure countdown and redirect
  useEffect(() => {
    if (!verificationStatus.isLoading && !verificationStatus.isSuccess && failureCountdown > 0) {
      const timer = setTimeout(() => setFailureCountdown(failureCountdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (!verificationStatus.isLoading && !verificationStatus.isSuccess && failureCountdown === 0) {
      navigate('/verify-email');
    }
  }, [failureCountdown, verificationStatus.isLoading, verificationStatus.isSuccess, navigate]);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.EMAIL_VERIFICATION}/${token}`
        );

        if (response.data.status === 'success') {
          setVerificationStatus({
            isLoading: false,
            isSuccess: true,
            message: 'Email verified successfully!'
          });
          Toast.success('Email verified successfully!');
          
          // Run confetti animation
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } else {
          throw new Error('Verification failed');
        }
      } catch (error) {
        console.error('Verification Error:', error);
        setVerificationStatus({
          isLoading: false,
          isSuccess: false,
          message: error.response?.data?.message || 'Email verification failed. Please try again.'
        });
        Toast.error(error.response?.data?.message || 'Email verification failed');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  const renderContent = () => {
    if (verificationStatus.isLoading) {
      return (
        <div className="text-center">
          <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading"/>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Verifying your email...</p>
        </div>
      );
    }

    return (
      <div className="text-center">
        <div className={`mb-4 inline-flex items-center justify-center size-12 rounded-full ${verificationStatus.isSuccess ? 'bg-green-600' : 'bg-red-600'}`}>
          {verificationStatus.isSuccess ? (
            <svg className="size-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            <svg className="size-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
        <h3 className="text-center text-lg font-semibold text-gray-800 dark:text-white">
          {verificationStatus.isSuccess ? 'Email Verified' : 'Verification Failed'}
        </h3>
        <p className="text-center mt-2 text-gray-600 dark:text-gray-400">
          {verificationStatus.message}
        </p>
        {verificationStatus.isSuccess ? (
          <p className="text-center mt-2 text-sm text-blue-600 dark:text-blue-400">
            Redirecting to login in {countdown} seconds...
          </p>
        ) : !verificationStatus.isLoading && (
          <p className="text-center mt-2 text-sm text-red-600 dark:text-red-400">
            Redirecting to verification page in {failureCountdown} seconds...
          </p>
        )}
        <div className="mt-6">
          <Link
            to={verificationStatus.isSuccess ? '/login' : '/verify-email'}
            className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-offset-gray-800"
          >
            {verificationStatus.isSuccess ? 'Proceed to Login' : 'Try Again'}
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="mt-7 border border-gray-200 rounded-xl shadow-sm dark:border-gray-700 max-w-md mx-auto">
        <div className="p-4 sm:p-7">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification; 