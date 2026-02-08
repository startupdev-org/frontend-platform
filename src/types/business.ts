export interface Business {
  id: string;
  name: string;
  slug: string;
  subdomain: string | null;
  description: string | null;
  logo_url: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  category: string;
  price_range: number;
  working_hours: WorkingHours;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  average_rating?: number;
  review_count?: number;
}

export interface WorkingHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  open: string | null;
  close: string | null;
}

export interface BusinessFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  availableToday?: boolean;
}
