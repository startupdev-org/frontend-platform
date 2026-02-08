import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import TimeSlotPicker from '../../components/booking/TimeSlotPicker';
import { useBusiness } from '../../hooks/useBusiness';
import { useBooking } from '../../hooks/useBooking';
import { useToastStore } from '../../app/store';
import { supabase } from '../../services/api';
import { bookingService } from '../../services/booking.service';
import { Service } from '../../types/service';
import { Employee } from '../../types/employee';
import { TimeSlot } from '../../types/booking';
import { generateTimeSlots, getCurrentDaySchedule } from '../../utils/generateTimeSlots';

const bookingSchema = z.object({
  service_id: z.string().min(1, 'Please select a service'),
  employee_id: z.string().min(1, 'Please select an employee'),
  booking_date: z.string().min(1, 'Please select a date'),
  customer_name: z.string().min(2, 'Name must be at least 2 characters'),
  customer_email: z.string().email('Invalid email address'),
  customer_phone: z.string().min(6, 'Please enter a valid phone number'),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingPage() {
  const { businessSlug } = useParams<{ businessSlug: string }>();
  const navigate = useNavigate();
  const { business, isLoading: businessLoading } = useBusiness(businessSlug);
  const { createBooking, isLoading: bookingLoading } = useBooking();
  const addToast = useToastStore((state) => state.addToast);

  const [services, setServices] = useState<Service[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const selectedServiceId = watch('service_id');
  const selectedEmployeeId = watch('employee_id');
  const selectedDate = watch('booking_date');

  useEffect(() => {
    if (business) {
      fetchServices();
      fetchEmployees();
    }
  }, [business]);

  useEffect(() => {
    if (business && selectedEmployeeId && selectedDate) {
      fetchTimeSlots();
    }
  }, [business, selectedEmployeeId, selectedDate]);

  const fetchServices = async () => {
    if (!business) return;

    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('business_id', business.id)
      .eq('is_active', true)
      .order('name');

    if (data) setServices(data);
  };

  const fetchEmployees = async () => {
    if (!business) return;

    const { data } = await supabase
      .from('employees')
      .select('*')
      .eq('business_id', business.id)
      .eq('is_active', true)
      .order('name');

    if (data) setEmployees(data);
  };

  const fetchTimeSlots = async () => {
    if (!business || !selectedEmployeeId || !selectedDate) return;

    const daySchedule = getCurrentDaySchedule(business.working_hours);

    if (!daySchedule.open || !daySchedule.close) {
      setTimeSlots([]);
      return;
    }

    const bookedSlots = await bookingService.getBookedSlots(
      selectedEmployeeId,
      selectedDate
    );

    const slots = generateTimeSlots(
      daySchedule.open,
      daySchedule.close,
      30,
      bookedSlots
    );

    setTimeSlots(slots);
  };

  const onSubmit = async (data: BookingFormData) => {
    if (!business || !selectedTime) {
      addToast('Please select a time slot', 'error');
      return;
    }

    try {
      const booking = await createBooking({
        business_id: business.id,
        service_id: data.service_id,
        employee_id: data.employee_id,
        booking_date: data.booking_date,
        booking_time: selectedTime,
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_phone: data.customer_phone,
        notes: data.notes,
      });

      addToast('Booking created successfully!', 'success');
      navigate(`/booking-success/${booking.id}`);
    } catch (error) {
      addToast('Failed to create booking', 'error');
    }
  };

  if (businessLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Business not found</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Book Appointment - {business.name}</title>
        <meta name="description" content={`Book an appointment at ${business.name}`} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />

        <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Appointment</h1>
            <p className="text-gray-600 mb-8">at {business.name}</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Select
                label="Select Service"
                error={errors.service_id?.message}
                {...register('service_id')}
              >
                <option value="">Choose a service...</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - ${service.price} ({service.duration_minutes} min)
                  </option>
                ))}
              </Select>

              <Select
                label="Select Employee"
                error={errors.employee_id?.message}
                {...register('employee_id')}
              >
                <option value="">Choose an employee...</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} {employee.position ? `- ${employee.position}` : ''}
                  </option>
                ))}
              </Select>

              <Input
                type="date"
                label="Select Date"
                min={new Date().toISOString().split('T')[0]}
                error={errors.booking_date?.message}
                {...register('booking_date')}
              />

              {selectedEmployeeId && selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time
                  </label>
                  <TimeSlotPicker
                    slots={timeSlots}
                    selectedTime={selectedTime}
                    onSelectTime={setSelectedTime}
                  />
                  {!selectedTime && (
                    <p className="text-sm text-red-600 mt-1">Please select a time slot</p>
                  )}
                </div>
              )}

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Information</h2>

                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    placeholder="John Doe"
                    error={errors.customer_name?.message}
                    {...register('customer_name')}
                  />

                  <Input
                    type="email"
                    label="Email"
                    placeholder="john@example.com"
                    error={errors.customer_email?.message}
                    {...register('customer_email')}
                  />

                  <Input
                    type="tel"
                    label="Phone"
                    placeholder="+373 69 123 456"
                    error={errors.customer_phone?.message}
                    {...register('customer_phone')}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      className="block w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Any special requests or notes..."
                      {...register('notes')}
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                isLoading={bookingLoading}
                disabled={!selectedTime}
              >
                Confirm Booking
              </Button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
