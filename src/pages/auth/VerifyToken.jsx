import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authService } from '../../services/auth.service';

const VerifyToken = () => {
  const [status, setStatus] = useState({ message: '', isSuccess: false });
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await authService.verifyEmail(token);
        setStatus({
          message: response.message,
          isSuccess: true
        });
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/auth/login');
        }, 3000);
      } catch (error) {
        setStatus({
          message: error.response?.data?.message || 'Verification failed',
          isSuccess: false
        });
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Email Verification
          </h2>
          {status.message && (
            <div
              className={`mt-4 p-4 rounded-md ${
                status.isSuccess
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {status.message}
            </div>
          )}
          {status.isSuccess && (
            <p className="mt-2 text-center text-sm text-gray-600">
              Redirecting to login page...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyToken; 