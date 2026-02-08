export interface Review {
  id: string;
  business_id: string;
  booking_id: string | null;
  customer_name: string;
  rating_overall: number;
  rating_cleanliness: number | null;
  rating_service: number | null;
  rating_price: number | null;
  comment: string | null;
  reply: string | null;
  is_verified: boolean;
  created_at: string;
}

export interface CreateReviewDto {
  business_id: string;
  booking_id?: string;
  customer_name: string;
  rating_overall: number;
  rating_cleanliness?: number;
  rating_service?: number;
  rating_price?: number;
  comment?: string;
}

export interface ReviewReplyDto {
  reply: string;
}

export interface RatingBreakdown {
  overall: number;
  cleanliness: number;
  service: number;
  price: number;
}
