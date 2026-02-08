import { TimeSlot } from '../../types/booking';
import { formatTime } from '../../utils/formatDate';

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

export default function TimeSlotPicker({
  slots,
  selectedTime,
  onSelectTime,
}: TimeSlotPickerProps) {
  if (slots.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No available time slots for this date
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
      {slots.map((slot) => (
        <button
          key={slot.time}
          onClick={() => slot.available && onSelectTime(slot.time)}
          disabled={!slot.available}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedTime === slot.time
              ? 'bg-blue-600 text-white'
              : slot.available
              ? 'bg-white border border-gray-300 text-gray-900 hover:border-blue-500 hover:text-blue-600'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {formatTime(slot.time)}
        </button>
      ))}
    </div>
  );
}
