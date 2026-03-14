import axios from 'axios';
import { Booking, CreateBookingDto, UpdateBookingDto } from '../types/booking';

const HOSTNAME = import.meta.env.VITE_BACKEND_HOSTNAME || 'http://localhost:8080';
const REST_API_BASE_URL = `${HOSTNAME}/api/booking`;

export const bookingService = {
  async create(booking: CreateBookingDto): Promise<Booking> {
    const response = await axios.post<Booking>(REST_API_BASE_URL, booking);
    return response.data;
  },

  async getByBusiness(businessId: string): Promise<Booking[]> {
    const response = await axios.get<Booking[]>(`${REST_API_BASE_URL}/business/${businessId}`);
    return response.data ?? [];
  },

  async getById(id: string): Promise<Booking | null> {
    const response = await axios.get<Booking | null>(`${REST_API_BASE_URL}/${id}`);
    return response.data ?? null;
  },

  async update(id: string, updates: UpdateBookingDto): Promise<Booking> {
    const response = await axios.patch<Booking>(`${REST_API_BASE_URL}/${id}/status`, updates);
    return response.data;
  },

  async getBookedSlots(
    employeeId: string,
    date: string
  ): Promise<string[]> {
    const response = await axios.get<Booking[]>(
      `${REST_API_BASE_URL}/employee/${employeeId}/range`,
      {
        params: {
          from: date,
          to: date,
        },
      }
    );

    const data = response.data ?? [];
    return data
      .filter((b) => b.booking_date === date && (b.status === 'pending' || b.status === 'confirmed'))
      .map((b) => b.booking_time);
  },

  async cancel(id: string): Promise<void> {
    await axios.patch(`${REST_API_BASE_URL}/${id}/status`, { status: 'cancelled' });
  },
};
