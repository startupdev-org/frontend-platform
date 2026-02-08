import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircleIcon, CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/solid';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Spinner from '../../components/ui/Spinner';
import Button from '../../components/ui/Button';
import { bookingService } from '../../services/booking.service';
import { Booking } from '../../types/booking';
import { formatDate, formatTime } from '../../utils/formatDate';

export default function BookingSuccessPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  const fetchBooking = async () => {
    if (!bookingId) return;

    try {
      const data = await bookingService.getById(bookingId);
      setBooking(data);
    } catch (error) {
      console.error('Failed to fetch booking:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Booking not found</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Booking Confirmed - BookBeauty</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />

        <div className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircleIcon className="w-12 h-12 text-green-600" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-8">
              Your appointment has been successfully scheduled.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Appointment Details</h2>

              <div className="space-y-4">
                {booking.business && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12">
                      <UserIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Business</p>
                      <p className="text-base text-gray-900">{booking.business.name}</p>
                    </div>
                  </div>
                )}

                {booking.service && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12">
                      <UserIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Service</p>
                      <p className="text-base text-gray-900">{booking.service.name}</p>
                    </div>
                  </div>
                )}

                {booking.employee && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12">
                      <UserIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Employee</p>
                      <p className="text-base text-gray-900">{booking.employee.name}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12">
                    <CalendarIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date</p>
                    <p className="text-base text-gray-900">{formatDate(booking.booking_date)}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12">
                    <ClockIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Time</p>
                    <p className="text-base text-gray-900">{formatTime(booking.booking_time)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                A confirmation has been sent to <strong>{booking.customer_email}</strong>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="secondary">Back to Marketplace</Button>
              </Link>
              {booking.business && (
                <Link to={`/business/${booking.business.slug}`}>
                  <Button>View Business</Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
