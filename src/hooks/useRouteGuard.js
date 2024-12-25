import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

export const useRouteGuard = (requireAuth = false) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      // Redirect to login if authentication is required but user is not authenticated
      navigate('/login', { state: { from: location } });
    }
  }, [isAuthenticated, navigate, location, requireAuth]);

  return isAuthenticated;
}; 