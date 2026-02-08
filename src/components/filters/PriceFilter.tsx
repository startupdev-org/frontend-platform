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
        Price Range
      </label>
      <div className="flex items-center space-x-2">
        <select
          value={minPrice}
          onChange={(e) => onMinChange(Number(e.target.value))}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value={1}>$</option>
          <option value={2}>$$</option>
          <option value={3}>$$$</option>
          <option value={4}>$$$$</option>
        </select>
        <span className="text-gray-500">to</span>
        <select
          value={maxPrice}
          onChange={(e) => onMaxChange(Number(e.target.value))}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value={1}>$</option>
          <option value={2}>$$</option>
          <option value={3}>$$$</option>
          <option value={4}>$$$$</option>
        </select>
      </div>
    </div>
  );
}
