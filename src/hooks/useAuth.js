import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser, logoutUser } from '../store/slices/authSlice';
import Toast from '../components/common/Toast';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector((state) => state.auth);

  const login = async (response) => {
    try {
      if (response?.status === 'success' && response?.data) {
        const { token, user } = response.data;
        dispatch(loginUser({ token, user }));
        Toast.success(response.message || 'Login successful!');
        
        // Get redirect path or default to dashboard
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
        return true;
      }
      return false;
    } catch (error) {
      Toast.error('Login failed');
      return false;
    }
  };

  const logout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return {
    ...auth,
    login,
    logout,
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    token: auth.token
  };
}; 