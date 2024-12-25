import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword, verifyResetCode, resetPassword } from '../services/authService';
import Toast from './common/Toast';
import PinInput from './common/PinInput';
import PasswordInput from './common/PasswordInput';

const STEPS = {
  EMAIL: 'email',
  VERIFY: 'verify',
  RESET: 'reset'
};

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(STEPS.EMAIL);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [resetId, setResetId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await forgotPassword(email);
      if (response.status === 'success' && response.resetId) {
        setResetId(response.resetId);
        Toast.success('Reset code has been sent to your email');
        setCurrentStep(STEPS.VERIFY);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to process request';
      Toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      Toast.error('Please enter a valid 6-digit code');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await verifyResetCode(resetId, otp);
      // console.log(response);
      
      if (response.status === 'success' && response.data?.resetToken) {
        setResetToken(response.data.resetToken);
        Toast.success('Code verified successfully');
        setCurrentStep(STEPS.RESET);
      } else {
        throw new Error('Invalid verification response');
      }
    } catch (err) {
      console.error('Verification Error:', err);
      const errorMessage = err.response?.data?.message || 'Invalid verification code';
      Toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await resetPassword(resetToken, newPassword);
      Toast.success('Password reset successful! Please login with your new password');
      // Redirect to login after a short delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to reset password';
      Toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case STEPS.EMAIL:
        return (
          <form onSubmit={handleEmailSubmit}>
            <div className="grid gap-y-4">
              <div>
                <label htmlFor="email" className="block text-sm mb-2 dark:text-white">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-offset-gray-800"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin inline-block size-4 border-[2px] border-current border-t-transparent text-white rounded-full"/>
                    Sending...
                  </>
                ) : (
                  'Send Reset Code'
                )}
              </button>
            </div>
          </form>
        );

      case STEPS.VERIFY:
        return (
          <form onSubmit={handleVerifyOtp}>
            <div className="grid gap-y-4">
              <div>
                <label className="block text-sm mb-2 dark:text-white">
                  Enter verification code
                </label>
                <div className="mt-2">
                  <PinInput
                    length={6}
                    value={otp}
                    onChange={setOtp}
                    disabled={isLoading}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  We sent a code to {email}
                </p>
              </div>
              <button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-offset-gray-800"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin inline-block size-4 border-[2px] border-current border-t-transparent text-white rounded-full"/>
                    Verifying...
                  </>
                ) : (
                  'Verify Code'
                )}
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(STEPS.EMAIL)}
                className="w-full py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                Back to Email
              </button>
            </div>
          </form>
        );

      case STEPS.RESET:
        return (
          <form onSubmit={handleResetPassword}>
            <div className="grid gap-y-4">
              <div>
                <label htmlFor="newPassword" className="block text-sm mb-2 dark:text-white">
                  New Password
                </label>
                <PasswordInput
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isLoading}
                  showHints={true}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-offset-gray-800"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin inline-block size-4 border-[2px] border-current border-t-transparent text-white rounded-full"/>
                    Resetting...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>
            </div>
          </form>
        );
    }
  };

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="mt-7 border border-gray-200 rounded-xl shadow-sm dark:border-gray-700 max-w-md mx-auto">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              {currentStep === STEPS.EMAIL && 'Forgot Password'}
              {currentStep === STEPS.VERIFY && 'Verify Code'}
              {currentStep === STEPS.RESET && 'Reset Password'}
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?
              <Link
                to="/login"
                className="ml-1 text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500"
              >
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            {error && (
              <div className="text-sm text-red-600 dark:text-red-500 mb-4">
                {error}
              </div>
            )}
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 