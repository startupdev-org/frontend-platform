import { supabase } from './api';
import { Booking, CreateBookingDto, UpdateBookingDto } from '../types/booking';

export const bookingService = {
  async create(booking: CreateBookingDto): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getByBusiness(businessId: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        service:services(*),
        employee:employees(*)
      `)
      .eq('business_id', businessId)
      .order('booking_date', { ascending: false })
      .order('booking_time', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Booking | null> {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        service:services(*),
        employee:employees(*),
        business:businesses(*)
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: UpdateBookingDto): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getBookedSlots(
    employeeId: string,
    date: string
  ): Promise<string[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('booking_time')
      .eq('employee_id', employeeId)
      .eq('booking_date', date)
      .in('status', ['pending', 'confirmed']);

    if (error) throw error;
    return (data || []).map((b) => b.booking_time);
  },

  async cancel(id: string): Promise<void> {
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', id);

    if (error) throw error;
  },
};
