interface RatingFilterProps {
  value: number;
  onChange: (rating: number) => void;
}

export default function RatingFilter({ value, onChange }: RatingFilterProps) {
  const ratings = [0, 3, 4, 5];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Rating minim
      </label>
      <select
        value={value}
        onChange={(e) => onChange(Number((e.target as HTMLSelectElement).value))}
        className="custom-dropdown-select text-dark bg-white rounded-2 sm:rounded px-3 py-2 fs-6 w-full border-0"
      >
        {ratings.map((rating) => (
          <option key={rating} value={rating}>
            {rating === 0 ? 'Toate ratingurile' : `${rating}+ stele`}
          </option>
        ))}
      </select>
    </div>
  );
}
