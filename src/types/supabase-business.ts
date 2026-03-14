
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
