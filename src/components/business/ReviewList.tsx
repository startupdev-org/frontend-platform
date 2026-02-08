import { Review } from '../../types/review';
import RatingStars from './RatingStars';
import { getRelativeTime } from '../../utils/formatDate';

interface ReviewListProps {
  reviews: Review[];
  businessName?: string;
  businessAvatar?: string | null;
}

export default function ReviewList({ reviews, businessName, businessAvatar }: ReviewListProps) {
  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
    return (parts[0].slice(0, 1) + parts[1].slice(0, 1)).toUpperCase();
  };

  return (
    <>
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No reviews yet</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium text-sm">
                    {getInitials(review.customer_name)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.customer_name}</p>
                    <p className="text-sm text-gray-500">{getRelativeTime(review.created_at)}</p>
                  </div>
                </div>
                <RatingStars rating={review.rating_overall} size="sm" />
              </div>

              {review.comment && (
                <p className="text-gray-700 mb-3">{review.comment}</p>
              )}

              {review.reply && (
                <div className="ml-4 p-3 bg-blue-50 rounded-lg flex items-start gap-3">
                  {businessAvatar ? (
                    <img src={businessAvatar} alt={businessName ?? 'Business'} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-medium">{(businessName || 'B').slice(0,1).toUpperCase()}</div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">{businessName ?? 'Business Response'}</p>
                    <p className="text-sm text-gray-700">{review.reply}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
