import { User } from "./auth";
import { Employee } from "./employee";
import { Service } from "./service";

export interface Business {
  id: string;
  name: string;
  slug: string;
  subdomain: string | null;
  description: string | null;
  providedServices: Service[];
  employeeList: Employee[];
  logo_url: string | null;
  cover_image_url?: string | null;
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
  owner: User;
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
  page: number;
  size: number;
  /** Free-text search (e.g. name, description, city — backend-defined) */
  search?: string;
  /** Category filter (e.g. 'Salon de înfrumusețare') */
  category?: string;
  /** Price range (e.g. 1–4) */
  minPrice?: number;
  maxPrice?: number;
  /** City slug or name filter */
  city?: string;
  /** Minimum average rating */
  minRating?: number;
}

export interface PaginatedResponse<T> {
  content: T[];             // List of businesses
  totalPages: number;       // Total number of pages
  /** Items on this page only; not the full-result count */
  numberOfElements: number; // Number of elements on the current page
  /** Total items across all pages (Spring Data `Page.totalElements`) */
  totalElements?: number;
  size: number;             // Page size
  number: number;           // Current page number (0-based)
  first: boolean;           // Whether it's the first page
  last: boolean;            // Whether it's the last page
}

export interface UseBusinessesReturn {
  businesses: Business[];
  totalElements: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
};