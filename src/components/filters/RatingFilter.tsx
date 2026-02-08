import { StarIcon } from '@heroicons/react/24/solid';

interface RatingFilterProps {
  value: number;
  onChange: (rating: number) => void;
}

export default function RatingFilter({ value, onChange }: RatingFilterProps) {
  const ratings = [0, 3, 4, 5];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Minimum Rating
      </label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {ratings.map((rating) => (
          <option key={rating} value={rating}>
            {rating === 0 ? 'All Ratings' : `${rating}+ Stars`}
          </option>
        ))}
      </select>
    </div>
  );
}
