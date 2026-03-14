import axios from 'axios';
import { Review, CreateReviewDto, ReviewReplyDto, RatingBreakdown } from '../types/review';

const HOSTNAME = import.meta.env.VITE_BACKEND_HOSTNAME || 'http://localhost:8080';
const REST_API_BASE_URL = `${HOSTNAME}/api/review`;

export const reviewService = {
  async getByBusiness(businessId: string): Promise<Review[]> {
    const response = await axios.get<Review[]>(`${REST_API_BASE_URL}/business/${businessId}`);
    return response.data ?? [];
  },

  async create(review: CreateReviewDto): Promise<Review> {
    if (!review.booking_id) {
      throw new Error('booking_id is required to create a review');
    }

    const { booking_id, ...payload } = review;
    const response = await axios.post<Review>(
      `${REST_API_BASE_URL}/booking/${booking_id}`,
      payload
    );
    return response.data;
  },

  async reply(reviewId: string, reply: ReviewReplyDto): Promise<Review> {
    const response = await axios.patch<Review>(
      `${REST_API_BASE_URL}/${reviewId}/reply`,
      reply
    );
    return response.data;
  },

  async getRatingBreakdown(businessId: string): Promise<RatingBreakdown> {
    const response = await axios.get<RatingBreakdown>(
      `${REST_API_BASE_URL}/business/${businessId}/average`
    );

    const data = response.data;

    return {
      overall: data.overall ?? 0,
      cleanliness: data.cleanliness ?? 0,
      service: data.service ?? 0,
      price: data.price ?? 0,
    };
  },
};
