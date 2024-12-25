import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const authState = localStorage.getItem('authState');
    if (authState) {
      try {
        const state = JSON.parse(authState);
        if (state.isAuthenticated && state.token) {
          dispatch(loginUser({
            user: state.user,
            token: state.token
          }));
        }
      } catch (e) {
        localStorage.removeItem('authState');
        navigate('/login');
      }
    }
  }, [dispatch, navigate]);
}; 