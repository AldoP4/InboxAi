import React from 'react';
import { FilterState } from '../types';
import { CATEGORIES, PRIORITIES } from '../constants';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center text-gray-400 mr-2">
            <Filter size={16} />
        </div>
      <select
        value={filters.category}
        onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
        className="form-select text-sm border-gray-200 rounded-lg py-1.5 px-3 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm cursor-pointer"
      >
        {CATEGORIES.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
      </select>

      <select
        value={filters.priority}
        onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
        className="form-select text-sm border-gray-200 rounded-lg py-1.5 px-3 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm cursor-pointer"
      >
        {PRIORITIES.map(p => <option key={p} value={p}>{p === 'All' ? 'All Priorities' : p}</option>)}
      </select>
    </div>
  );
};