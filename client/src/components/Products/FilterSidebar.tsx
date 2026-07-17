import { FilterIcon } from "lucide-react";
import type { FC } from "react";

interface Props {
  category: string;
  organic: string;
  minPrice: string;
  maxPrice: string;
  updateFilter: (key: string, value: string) => void;
  clearFilters: () => void;
  mobileFiltersOpen: boolean;
}

const categories = [
  "All Categories",
  "Fruits",
  "Vegetables",
  "Personal Care",
  "Pantry",
  "Bakery",
  "Beverages",
  "Meat & Seafood",
  "Snacks",
  "Frozen Foods",
  "Baby Care",
  "Dairy",
];

const FilterSidebar: FC<Props> = ({ category, organic, minPrice, maxPrice, updateFilter, clearFilters, mobileFiltersOpen }) => {
  return (
    <aside className={`rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm ${mobileFiltersOpen ? "block" : "hidden md:block"}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FilterIcon className="size-4 text-app-orange" />
          <h2 className="font-semibold text-zinc-900">Filters</h2>
        </div>
        <button className="text-sm text-app-orange" onClick={clearFilters}>
          Clear
        </button>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">Categories</label>
          <div className="rounded-xl border border-zinc-100 bg-white">
            {categories.map((cat) => {
              const value = cat === "All Categories" ? "" : cat;
              const active = value === category || (cat === "All Categories" && category === "");
              return (
                <button
                  key={cat}
                  onClick={() => updateFilter("category", value)}
                  className={`w-full text-left px-4 py-3 text-sm ${active ? "bg-emerald-950 text-white" : "text-zinc-700 hover:bg-zinc-50"}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">Organic only</label>
          <select
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none"
            value={organic}
            onChange={(event) => updateFilter("organic", event.target.value)}
          >
            <option value="">Any</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">Min price</label>
            <input
              type="number"
              min="0"
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none"
              value={minPrice}
              onChange={(event) => updateFilter("minPrice", event.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">Max price</label>
            <input
              type="number"
              min="0"
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none"
              value={maxPrice}
              onChange={(event) => updateFilter("maxPrice", event.target.value)}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
