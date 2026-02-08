interface CategoryFilterProps {
  value: string;
  onChange: (category: string) => void;
}

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'barbershop', label: 'Barbershop' },
  { value: 'salon', label: 'Beauty Salon' },
  { value: 'spa', label: 'Spa' },
  { value: 'nails', label: 'Nail Salon' },
];

export default function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Category
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  );
}
