import { supabase } from './api';
import { Review, CreateReviewDto, ReviewReplyDto, RatingBreakdown } from '../types/review';

export const reviewService = {
  async getByBusiness(businessId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('business_id', businessId)
      .eq('is_verified', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async create(review: CreateReviewDto): Promise<Review> {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async reply(reviewId: string, reply: ReviewReplyDto): Promise<Review> {
    const { data, error } = await supabase
      .from('reviews')
      .update({ reply: reply.reply })
      .eq('id', reviewId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getRatingBreakdown(businessId: string): Promise<RatingBreakdown> {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating_overall, rating_cleanliness, rating_service, rating_price')
      .eq('business_id', businessId)
      .eq('is_verified', true);

    if (error) throw error;

    if (!data || data.length === 0) {
      return {
        overall: 0,
        cleanliness: 0,
        service: 0,
        price: 0,
      };
    }

    const count = data.length;
    const sum = data.reduce(
      (acc, review) => ({
        overall: acc.overall + review.rating_overall,
        cleanliness: acc.cleanliness + (review.rating_cleanliness || 0),
        service: acc.service + (review.rating_service || 0),
        price: acc.price + (review.rating_price || 0),
      }),
      { overall: 0, cleanliness: 0, service: 0, price: 0 }
    );

    return {
      overall: sum.overall / count,
      cleanliness: sum.cleanliness / count,
      service: sum.service / count,
      price: sum.price / count,
    };
  },
};
