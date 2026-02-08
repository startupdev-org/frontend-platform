import { useState } from 'react';
import { bookingService } from '../services/booking.service';
import { CreateBookingDto } from '../types/booking';

export const useBooking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (bookingData: CreateBookingDto) => {
    setIsLoading(true);
    setError(null);

    try {
      const booking = await bookingService.create(bookingData);
      return booking;
    } catch (err) {
      setError('Failed to create booking');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createBooking, isLoading, error };
};
