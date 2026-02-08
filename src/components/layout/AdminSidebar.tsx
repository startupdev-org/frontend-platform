import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  WrenchScrewdriverIcon,
  UsersIcon,
  CalendarDaysIcon,
  StarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import { useToastStore } from '../../app/store';

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const addToast = useToastStore((state) => state.addToast);

  const handleLogout = async () => {
    try {
      await logout();
      addToast('Logged out successfully', 'success');
      navigate('/admin/login');
    } catch (error) {
      addToast('Failed to logout', 'error');
    }
  };

  const navItems = [
    { path: '/admin/dashboard', icon: HomeIcon, label: 'Dashboard' },
    { path: '/admin/services', icon: WrenchScrewdriverIcon, label: 'Services' },
    { path: '/admin/employees', icon: UsersIcon, label: 'Employees' },
    { path: '/admin/bookings', icon: CalendarDaysIcon, label: 'Bookings' },
    { path: '/admin/reviews', icon: StarIcon, label: 'Reviews' },
    { path: '/admin/settings', icon: Cog6ToothIcon, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all w-full"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
