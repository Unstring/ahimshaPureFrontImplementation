import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { resendVerification } from '../services/authService';
import Toast from './common/Toast';

const VerifyEmail = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const payload = {
        email,
        baseUrl: window.location.origin + "/auth/verify/"
      };
      console.log(payload);
      
      const response = await resendVerification(payload);
      setIsSubmitted(true);
      Toast.success('Verification email sent successfully!');
    } catch (err) {
      console.log(err);
      const errorMessage = err?.message || 'Failed to send verification email';
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
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Verify Email</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Email already verified?
              <Link
                to="/login"
                className="ml-1 text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500"
              >
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            {/* Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-y-4">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2 dark:text-white">
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        placeholder="Enter your email"
                      />
                    </div>
                    {error && (
                      <p className="text-xs text-red-600 mt-2 dark:text-red-500">
                        {error}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-offset-gray-800"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-spin inline-block size-4 border-[2px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                        Sending...
                      </>
                    ) : (
                      'Send Verification Email'
                    )}
                  </button>
                </div>
              </form>
            ) : (
              // Success Message
              <div className="text-center">
                <div className="mb-4 inline-flex items-center justify-center size-12 rounded-full bg-blue-600">
                  <svg className="size-6 text-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13 7h-6v5h6v-5zm-1 4h-4v-3h4v3z"/>
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2z"/>
                  </svg>
                </div>
                <h3 className="text-center text-lg font-semibold text-gray-800 dark:text-white">
                  Check your email
                </h3>
                <p className="text-center mt-2 text-gray-600 dark:text-gray-400">
                  We have sent a verification email to <span className="font-medium">{email}</span>
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    Resend email
                  </button>
                  <Link
                    to="/login"
                    className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-offset-gray-800"
                  >
                    Back to login
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;