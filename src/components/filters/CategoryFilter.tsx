interface CategoryFilterProps {
  value: string;
  onChange: (category: string) => void;
}

const categories = [
  { value: '', label: 'Toate categoriile' },
  { value: 'barbershop', label: 'Frizerie' },
  { value: 'salon', label: 'Salon de înfrumusețare' },
  { value: 'spa', label: 'Spa & wellness' },
  { value: 'nails', label: 'Salon de unghii' },
];

export default function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Categorie
      </label>
      <select
        value={value}
        onChange={(e) => onChange((e.target as HTMLSelectElement).value)}
        className="custom-dropdown-select text-dark bg-white rounded-2 sm:rounded px-3 py-2 fs-6 w-full border-0"
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
