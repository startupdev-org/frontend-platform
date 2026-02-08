import { TimeSlot } from '../types/booking';

export const generateTimeSlots = (
  openTime: string,
  closeTime: string,
  intervalMinutes: number = 30,
  bookedSlots: string[] = []
): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const [openHour, openMinute] = openTime.split(':').map(Number);
  const [closeHour, closeMinute] = closeTime.split(':').map(Number);

  let currentHour = openHour;
  let currentMinute = openMinute;

  while (
    currentHour < closeHour ||
    (currentHour === closeHour && currentMinute < closeMinute)
  ) {
    const timeString = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;

    slots.push({
      time: timeString,
      available: !bookedSlots.includes(timeString),
    });

    currentMinute += intervalMinutes;
    if (currentMinute >= 60) {
      currentHour += Math.floor(currentMinute / 60);
      currentMinute = currentMinute % 60;
    }
  }

  return slots;
};

export const isBusinessOpen = (
  daySchedule: { open: string | null; close: string | null }
): boolean => {
  return daySchedule.open !== null && daySchedule.close !== null;
};

export const getCurrentDaySchedule = (
  workingHours: Record<string, { open: string | null; close: string | null }>
): { open: string | null; close: string | null } => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];
  return workingHours[today];
};
