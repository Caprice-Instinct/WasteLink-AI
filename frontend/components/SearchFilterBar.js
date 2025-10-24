import { Search } from 'lucide-react';

export default function SearchFilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filterValue,
  onFilterChange,
  filterOptions = []
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg border">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border-none outline-none text-sm flex-1 bg-transparent"
          />
        </div>
      </div>
      {filterOptions.length > 0 && (
        <select
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
          className="bg-white px-4 py-2 rounded-lg border text-sm"
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
