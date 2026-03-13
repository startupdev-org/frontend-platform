import { createBrowserRouter, Navigate } from 'react-router-dom';
import MarketplacePage from '../pages/marketplace/MarketplacePage';
import BusinessTestPage from '../pages/marketplace/BusinessTestPage';
import BusinessDetailsPage from '../pages/marketplace/BusinessDetailsPage';
import LoginPage from '../pages/admin/LoginPage';
import DashboardPage from '../pages/admin/DashboardPage';
import ServicesPage from '../pages/admin/ServicesPage';
import EmployeesPage from '../pages/admin/EmployeesPage';
import BookingsPage from '../pages/admin/BookingsPage';
import ReviewsPage from '../pages/admin/ReviewsPage';
import SettingsPage from '../pages/admin/SettingsPage';
import NotFoundPage from '../pages/marketplace/NotFoundPage';
import CreateEmployeePage from '../pages/CreateEmployeePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/business/glowbeautystudio" replace />,
  },
  {
    path: '/businesses',
    element: <MarketplacePage />,
  },
  // {
  //   path: '/business/:slug',
  //   element: <BusinessTestPage />,
  // },
  {
    path: '/business-legacy/:slug',
    element: <BusinessDetailsPage />,
  },
  {
    path: '/mock/create-employee',
    element: <CreateEmployeePage />
  },
  // {
  //   path: '/book/:businessSlug',
  //   element: <BookingPage />,
  // },
  // {
  //   path: '/booking-success/:bookingId',
  //   element: <BookingSuccessPage />,
  // },
  {
    path: '/admin',
    element: <Navigate to="/admin/login" replace />,
  },
  {
    path: '/admin/login',
    element: <LoginPage />,
  },
  {
    path: '/admin/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/admin/services',
    element: <ServicesPage />,
  },
  {
    path: '/admin/employees',
    element: <EmployeesPage />,
  },
  {
    path: '/admin/bookings',
    element: <BookingsPage />,
  },
  {
    path: '/admin/reviews',
    element: <ReviewsPage />,
  },
  {
    path: '/admin/settings',
    element: <SettingsPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
