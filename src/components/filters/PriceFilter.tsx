interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  onMinChange: (price: number) => void;
  onMaxChange: (price: number) => void;
}

export default function PriceFilter({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
}: PriceFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Interval de preț
      </label>
      <div className="hstack items-center gap-2">
        <select
          value={minPrice}
          onChange={(e) => onMinChange(Number((e.target as HTMLSelectElement).value))}
          className="custom-dropdown-select text-dark bg-white rounded-2 sm:rounded px-3 py-2 fs-6 flex-1 border-0"
        >
          <option value={1}>€</option>
          <option value={2}>€€</option>
          <option value={3}>€€€</option>
          <option value={4}>€€€€</option>
        </select>
        <span className="text-gray-500">până la</span>
        <select
          value={maxPrice}
          onChange={(e) => onMaxChange(Number((e.target as HTMLSelectElement).value))}
          className="custom-dropdown-select text-dark bg-white rounded-2 sm:rounded px-3 py-2 fs-6 flex-1 border-0"
        >
          <option value={1}>€</option>
          <option value={2}>€€</option>
          <option value={3}>€€€</option>
          <option value={4}>€€€€</option>
        </select>
      </div>
    </div>
  );
}
