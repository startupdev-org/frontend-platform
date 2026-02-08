import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

interface RatingStarsProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

export default function RatingStars({
  rating,
  size = 'md',
  showNumber = false,
  className = '',
}: RatingStarsProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className={`flex items-center ${className}`}>
      {stars.map((star) => (
        <span key={star}>
          {star <= rating ? (
            <StarIcon className={`${sizes[size]} text-yellow-400`} />
          ) : (
            <StarOutlineIcon className={`${sizes[size]} text-gray-300`} />
          )}
        </span>
      ))}
      {showNumber && (
        <span className="ml-2 text-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
