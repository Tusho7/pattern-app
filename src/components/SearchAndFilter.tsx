import React from "react";
import { Search } from "lucide-react";
import type { SearchAndFilterProps } from "../types/searchAndFilter";

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-12">
      <div className="relative flex-1">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
        <input
          type="text"
          placeholder="Search patterns..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-14 pr-5 py-4 rounded-3xl bg-white shadow-md border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
          autoComplete="off"
        />
      </div>

      <nav
        aria-label="Pattern categories"
        className="flex flex-wrap gap-4 max-w-full overflow-x-auto no-scrollbar"
      >
        <button
          type="button"
          onClick={() => onCategoryChange("")}
          className={`select-none whitespace-nowrap px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer
            ${
              selectedCategory === ""
                ? "bg-indigo-600 text-white shadow-[0_8px_15px_rgba(99,102,241,0.3)]"
                : "bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
            }
            focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2`}
        >
          All
        </button>

        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(isSelected ? "" : category)}
              className={`select-none whitespace-nowrap px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer
                ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-[0_8px_15px_rgba(99,102,241,0.3)]"
                    : "bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                }
                focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
