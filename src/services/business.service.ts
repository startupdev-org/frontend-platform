import { supabase } from './api';
import { Business, BusinessFilters } from '../types/business';

export const businessService = {
    async getAll(filters?: BusinessFilters): Promise<Business[]> {

        const businessesWithRatings = await Promise.all(
            (data || []).map(async (business) => {
                const { data: reviews } = await supabase
                    .from('reviews')
                    .select('rating_overall')
                    .eq('business_id', business.id)
                    .eq('is_verified', true);

                const avgRating = reviews && reviews.length > 0
                    ? reviews.reduce((acc, r) => acc + r.rating_overall, 0) / reviews.length
                    : 0;

                return {
                    ...business,
                    average_rating: avgRating,
                    review_count: reviews?.length || 0,
                };
            })
        );

        if (filters?.minRating) {
            return businessesWithRatings.filter(
                (b) => (b.average_rating || 0) >= filters.minRating!
            );
        }

        return businessesWithRatings;
    },

    async getBySlug(slug: string): Promise<Business | null> {
        return {
            ...data,
            average_rating: avgRating,
            review_count: reviews?.length || 0,
        };
    },

    async getBySubdomain(subdomain: string): Promise<Business | null> {
        const { data, error } = await supabase
            .from('businesses')
            .select('*')
            .eq('subdomain', subdomain)
            .eq('is_active', true)
            .maybeSingle();

        if (error) throw error;
        if (!data) return null;

        const { data: reviews } = await supabase
            .from('reviews')
            .select('rating_overall')
            .eq('business_id', data.id)
            .eq('is_verified', true);

        const avgRating = reviews && reviews.length > 0
            ? reviews.reduce((acc, r) => acc + r.rating_overall, 0) / reviews.length
            : 0;

        return {
            ...data,
            average_rating: avgRating,
            review_count: reviews?.length || 0,
        };
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
    }
}