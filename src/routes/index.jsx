import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { ROUTES } from '../config/constants';

// Lazy load components
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Products = lazy(() => import('../pages/Products'));
const Contact = lazy(() => import('../pages/Contact'));
const Login = lazy(() => import('../components/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Profile = lazy(() => import('../pages/Profile'));
const Terms = lazy(() => import('../pages/legal/Terms'));
const Privacy = lazy(() => import('../pages/legal/Privacy'));
const Refund = lazy(() => import('../pages/legal/Refund'));
const FAQ = lazy(() => import('../pages/FAQ'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Signup = lazy(() => import('../components/Signup'));
const ForgotPassword = lazy(() => import('../components/ForgotPassword'));
const VerifyEmail = lazy(() => import('../components/VerifyEmail'));
const EmailVerification = lazy(() => import('../pages/auth/EmailVerification'));
const Settings = lazy(() => import('../pages/Settings'));
const BannerManagement = lazy(() => import('../pages/BannerManagement'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Outlet />
            </Suspense>
          }
        >
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/banners" element={<BannerManagement />} />
          </Route>

          {/* Email Verification Route */}
          <Route path="/auth/verify/:token" element={<EmailVerification />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;