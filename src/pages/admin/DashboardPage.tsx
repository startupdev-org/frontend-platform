import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import {
  CalendarDaysIcon,
  StarIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import AdminSidebar from '../../components/layout/AdminSidebar';
import StatsCard from '../../components/dashboard/StatsCard';
import Spinner from '../../components/ui/Spinner';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../services/api';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const [stats, setStats] = useState({
    totalBookings: 0,
    averageRating: 0,
    repeatClients: 0,
    popularService: 'N/A',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    const { data: bookings } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    const { data: reviews } = await supabase
      .from('reviews')
      .select('rating_overall')
      .eq('is_verified', true);

    const avgRating =
      reviews && reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating_overall, 0) / reviews.length
        : 0;

    setStats({
      totalBookings: bookings?.length || 0,
      averageRating: Math.round(avgRating * 10) / 10,
      repeatClients: 0,
      popularService: 'Haircut',
    });

    setIsLoading(false);
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Admin Panel</title>
      </Helmet>

      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

            {isLoading ? (
              <div className="flex justify-center py-16">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  title="Total Bookings"
                  value={stats.totalBookings}
                  icon={<CalendarDaysIcon className="h-6 w-6" />}
                  iconBg="bg-blue-100"
                  iconColor="text-blue-600"
                />

                <StatsCard
                  title="Average Rating"
                  value={stats.averageRating}
                  icon={<StarIcon className="h-6 w-6" />}
                  iconBg="bg-yellow-100"
                  iconColor="text-yellow-600"
                />

                <StatsCard
                  title="Repeat Clients"
                  value={stats.repeatClients}
                  icon={<UsersIcon className="h-6 w-6" />}
                  iconBg="bg-green-100"
                  iconColor="text-green-600"
                />

                <StatsCard
                  title="Popular Service"
                  value={stats.popularService}
                  icon={<WrenchScrewdriverIcon className="h-6 w-6" />}
                  iconBg="bg-purple-100"
                  iconColor="text-purple-600"
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
