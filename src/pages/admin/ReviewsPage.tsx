import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Spinner from '../../components/ui/Spinner';
import { useAuth } from '../../hooks/useAuth';

export default function ReviewsPage() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login');
    }
  }, [user, authLoading, navigate]);

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
        <title>Reviews - Admin Panel</title>
      </Helmet>

      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Reviews</h1>

            <div className="bg-white rounded-xl shadow-md p-16 text-center">
              <p className="text-gray-600">Review management coming soon</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
