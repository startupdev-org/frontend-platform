import { Review } from '../../types/review';
import RatingStars from './RatingStars';
import { getRelativeTime } from '../../utils/formatDate';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

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
        <p className="text-center text-gray-500 py-8">Încă nu există recenzii</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 sm:p-5">
              <div className="flex gap-3 sm:gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600">
                  {getInitials(review.customer_name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-gray-900">{review.customer_name}</span>
                    {review.is_verified && (
                      <span className="inline-flex items-center gap-0.5 text-xs text-emerald-600">
                        <CheckBadgeIcon className="h-3.5 w-3.5" />
                        Verificat
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm text-gray-500">
                    <RatingStars rating={review.rating_overall} size="sm" />
                    <span>{getRelativeTime(review.created_at)}</span>
                  </div>
                  {review.comment && (
                    <p className="mt-3 text-sm text-gray-700 leading-relaxed">{review.comment}</p>
                  )}
                  {review.reply && (
                    <div className="mt-4 flex gap-3 rounded-lg border border-gray-200 bg-white p-3">
                      {businessAvatar ? (
                        <img
                          src={businessAvatar}
                          alt=""
                          className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                          {(businessName || 'B').slice(0, 1).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-500">{businessName ?? 'Răspuns'}</p>
                        <p className="mt-0.5 text-sm text-gray-700">{review.reply}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
