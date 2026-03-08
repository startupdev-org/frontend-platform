import { supabase } from './api';
import { Business, BusinessFilters } from '../types/business';
import { SupabaseBusinessRow } from '../types/supabase-business';

const DEFAULT_WORKING_HOURS = {
  monday: { open: '09:00', close: '18:00' },
  tuesday: { open: '09:00', close: '18:00' },
  wednesday: { open: '09:00', close: '18:00' },
  thursday: { open: '09:00', close: '18:00' },
  friday: { open: '09:00', close: '18:00' },
  saturday: { open: '09:00', close: '16:00' },
  sunday: { open: null, close: null },
} as const;

function mapSupabaseRowToBusiness(
  row: SupabaseBusinessRow,
  reviewCount: number,
  averageRatingFromReviews?: number
): Business {
  const ratingOverall =
    row.rating_overall != null
      ? Number(row.rating_overall)
      : averageRatingFromReviews ?? 0;

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    subdomain: null,
    description: row.description ?? null,
    logo_url: row.logo_url ?? null,
    cover_image_url: row.cover_image_url ?? null,
    phone: row.phone ?? null,
    email: null,
    address: row.address ?? null,
    city: row.city ?? null,
    latitude: null,
    longitude: null,
    category: 'Salon de înfrumusețare',
    price_range: 0,
    working_hours: DEFAULT_WORKING_HOURS,
    is_active: true,
    created_at: row.created_at,
    updated_at: row.updated_at,
    average_rating: ratingOverall,
    review_count: reviewCount,
  };
}

export const businessService = {
  async getAll(filters?: BusinessFilters): Promise<Business[]> {
    let query = supabase.from('businesses').select('*').order('name');

    if (filters?.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;

    const businessesWithRatings = await Promise.all(
      (data || []).map(async (row: SupabaseBusinessRow) => {
        const { data: reviews } = await supabase
          .from('reviews')
          .select('rating_overall')
          .eq('business_id', row.id);

        const count = reviews?.length ?? 0;
        const avgRating =
          count > 0
            ? reviews!.reduce((acc, r) => acc + Number(r.rating_overall ?? 0), 0) / count
            : 0;

        return mapSupabaseRowToBusiness(row, count, avgRating);
      })
    );

    if (filters?.minRating != null) {
      return businessesWithRatings.filter(
        (b) => (b.average_rating ?? 0) >= filters.minRating!
      );
    }

    return businessesWithRatings;
  },

  async getBySlug(slug: string): Promise<Business | null> {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    const row = data as SupabaseBusinessRow;

    const { data: reviews } = await supabase
      .from('reviews')
      .select('rating_overall')
      .eq('business_id', row.id);

    const count = reviews?.length ?? 0;
    const avgRating =
      count > 0
        ? reviews!.reduce((acc, r) => acc + Number(r.rating_overall ?? 0), 0) / count
        : 0;

    return mapSupabaseRowToBusiness(row, count, avgRating);
  },

  async getBySubdomain(_subdomain: string): Promise<Business | null> {
    return null;
  },

  async update(id: string, updates: Partial<Business>): Promise<Business> {
    const { data, error } = await supabase
      .from('businesses')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
