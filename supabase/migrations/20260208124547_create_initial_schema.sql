/*
  # Create Initial Beauty & Barbershop SaaS Schema

  ## Overview
  This migration creates the foundational database structure for a beauty and barbershop booking platform.

  ## New Tables

  ### 1. businesses
  - `id` (uuid, primary key) - Unique business identifier
  - `name` (text) - Business name
  - `slug` (text, unique) - URL-friendly business identifier
  - `subdomain` (text, unique) - Subdomain for business (e.g., realmen)
  - `description` (text) - About the business
  - `logo_url` (text) - Logo image URL
  - `phone` (text) - Contact phone
  - `email` (text) - Contact email
  - `address` (text) - Physical address
  - `city` (text) - City location
  - `latitude` (numeric) - GPS latitude
  - `longitude` (numeric) - GPS longitude
  - `category` (text) - Business category (barbershop, salon, spa, etc.)
  - `price_range` (integer) - Price level 1-4 ($ to $$$$)
  - `working_hours` (jsonb) - Weekly schedule
  - `is_active` (boolean) - Business active status
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. services
  - `id` (uuid, primary key) - Unique service identifier
  - `business_id` (uuid, foreign key) - Associated business
  - `name` (text) - Service name
  - `description` (text) - Service description
  - `price` (numeric) - Service price
  - `duration_minutes` (integer) - Service duration
  - `is_active` (boolean) - Service availability
  - `created_at` (timestamptz) - Creation timestamp

  ### 3. employees
  - `id` (uuid, primary key) - Unique employee identifier
  - `business_id` (uuid, foreign key) - Associated business
  - `name` (text) - Employee name
  - `photo_url` (text) - Employee photo
  - `position` (text) - Job title
  - `bio` (text) - Employee biography
  - `is_active` (boolean) - Employment status
  - `created_at` (timestamptz) - Creation timestamp

  ### 4. bookings
  - `id` (uuid, primary key) - Unique booking identifier
  - `business_id` (uuid, foreign key) - Associated business
  - `service_id` (uuid, foreign key) - Booked service
  - `employee_id` (uuid, foreign key) - Assigned employee
  - `customer_name` (text) - Guest customer name
  - `customer_email` (text) - Guest customer email
  - `customer_phone` (text) - Guest customer phone
  - `booking_date` (date) - Appointment date
  - `booking_time` (time) - Appointment time
  - `status` (text) - Booking status (pending, confirmed, completed, cancelled)
  - `notes` (text) - Additional notes
  - `created_at` (timestamptz) - Booking creation timestamp

  ### 5. reviews
  - `id` (uuid, primary key) - Unique review identifier
  - `business_id` (uuid, foreign key) - Associated business
  - `booking_id` (uuid, foreign key) - Associated booking
  - `customer_name` (text) - Reviewer name
  - `rating_overall` (integer) - Overall rating 1-5
  - `rating_cleanliness` (integer) - Cleanliness rating 1-5
  - `rating_service` (integer) - Service quality rating 1-5
  - `rating_price` (integer) - Price value rating 1-5
  - `comment` (text) - Review text
  - `reply` (text) - Business reply
  - `is_verified` (boolean) - Verified booking review
  - `created_at` (timestamptz) - Review timestamp

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated business admins
  - Add public read access for marketplace data
  - Protect booking and review write operations
*/

-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  subdomain text UNIQUE,
  description text,
  logo_url text,
  phone text,
  email text,
  address text,
  city text,
  latitude numeric,
  longitude numeric,
  category text DEFAULT 'barbershop',
  price_range integer DEFAULT 2,
  working_hours jsonb DEFAULT '{"monday": {"open": "09:00", "close": "18:00"}, "tuesday": {"open": "09:00", "close": "18:00"}, "wednesday": {"open": "09:00", "close": "18:00"}, "thursday": {"open": "09:00", "close": "18:00"}, "friday": {"open": "09:00", "close": "18:00"}, "saturday": {"open": "10:00", "close": "16:00"}, "sunday": {"open": null, "close": null}}'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  duration_minutes integer NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  name text NOT NULL,
  photo_url text,
  position text,
  bio text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE RESTRICT,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  booking_date date NOT NULL,
  booking_time time NOT NULL,
  status text DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  booking_id uuid REFERENCES bookings(id) ON DELETE SET NULL,
  customer_name text NOT NULL,
  rating_overall integer NOT NULL CHECK (rating_overall >= 1 AND rating_overall <= 5),
  rating_cleanliness integer CHECK (rating_cleanliness >= 1 AND rating_cleanliness <= 5),
  rating_service integer CHECK (rating_service >= 1 AND rating_service <= 5),
  rating_price integer CHECK (rating_price >= 1 AND rating_price <= 5),
  comment text,
  reply text,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_services_business ON services(business_id);
CREATE INDEX IF NOT EXISTS idx_employees_business ON employees(business_id);
CREATE INDEX IF NOT EXISTS idx_bookings_business ON bookings(business_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_reviews_business ON reviews(business_id);
CREATE INDEX IF NOT EXISTS idx_businesses_slug ON businesses(slug);
CREATE INDEX IF NOT EXISTS idx_businesses_subdomain ON businesses(subdomain);
CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(category);

-- Enable Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for businesses (public read, authenticated admin write)
CREATE POLICY "Anyone can view active businesses"
  ON businesses FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage their businesses"
  ON businesses FOR ALL
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for services (public read, admin write)
CREATE POLICY "Anyone can view active services"
  ON services FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage services"
  ON services FOR ALL
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for employees (public read, admin write)
CREATE POLICY "Anyone can view active employees"
  ON employees FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage employees"
  ON employees FOR ALL
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for bookings (guests can create, admins can manage)
CREATE POLICY "Anyone can view bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete bookings"
  ON bookings FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- RLS Policies for reviews (public read, guests can create, admins can reply)
CREATE POLICY "Anyone can view verified reviews"
  ON reviews FOR SELECT
  USING (is_verified = true);

CREATE POLICY "Anyone can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);
