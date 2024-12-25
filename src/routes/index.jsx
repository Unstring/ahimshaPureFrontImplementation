import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { ROUTES } from '../config/constants';

// Page Imports
import Home from '../pages/Home';
import About from '../pages/About';
import Products from '../pages/Products';
import Contact from '../pages/Contact';
import Login from '../components/Login';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Terms from '../pages/legal/Terms';
import Privacy from '../pages/legal/Privacy';
import Refund from '../pages/legal/Refund';
import FAQ from '../pages/FAQ';
import NotFound from '../pages/NotFound';
import Signup from '../components/Signup';
import ForgotPassword from '../components/ForgotPassword';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path={ROUTES.HOME}
        element={
          <Layout>
            <PublicRoute />
          </Layout>
        }
      >
        <Route index element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.PRODUCTS} element={<Products />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
        <Route path={ROUTES.AUTH.SIGNUP} element={<Signup />} />
        <Route path={ROUTES.AUTH.FORGOT_PASSWORD} element={<ForgotPassword />} />
        
        {/* Legal Pages */}
        <Route path={ROUTES.LEGAL.TERMS} element={<Terms />} />
        <Route path={ROUTES.LEGAL.PRIVACY} element={<Privacy />} />
        <Route path={ROUTES.LEGAL.REFUND} element={<Refund />} />
        <Route path={ROUTES.FAQ} element={<FAQ />} />
      </Route>

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <PrivateRoute />
          </Layout>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* 404 Route */}
      <Route
        path="*"
        element={
          <Layout>
            <NotFound />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;