import { Service } from './service';
import { Employee } from './employee';
import { Business } from './business';

export interface Booking {
  id: string;
  business_id: string;
  service_id: string;
  employee_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  booking_date: string;
  booking_time: string;
  status: BookingStatus;
  notes: string | null;
  created_at: string;
  service?: Service;
  employee?: Employee;
  business?: Business;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface CreateBookingDto {
  business_id: string;
  service_id: string;
  employee_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  booking_date: string;
  booking_time: string;
  notes?: string;
}

export interface UpdateBookingDto {
  status?: BookingStatus;
  notes?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
