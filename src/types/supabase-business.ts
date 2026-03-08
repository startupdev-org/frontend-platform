/**
 * Shape of a row from public.businesses in Supabase.
 * Matches: id, address, city, cover_image_url, created_at, description, logo_url,
 * name, phone, rating_overall, slug, updated_at, website, owner_id, service_delivery_type
 */
export interface SupabaseBusinessRow {
  id: string;
  address: string;
  city: string;
  cover_image_url: string | null;
  created_at: string;
  description: string | null;
  logo_url: string | null;
  name: string;
  phone: string;
  rating_overall: number | string | null;
  slug: string;
  updated_at: string;
  website: string | null;
  owner_id: string;
  service_delivery_type: string | null;
}
