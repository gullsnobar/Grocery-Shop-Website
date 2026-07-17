import type { FC, Dispatch, SetStateAction } from "react";
import { SlidersHorizontalIcon, XIcon } from "lucide-react";

interface Props {
  productsCount: number;
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: Dispatch<SetStateAction<boolean>>;
  sort: string;
  updateFilter: (key: string, value: string) => void;
}

const ProductsHeader: FC<Props> = ({ productsCount, mobileFiltersOpen, setMobileFiltersOpen, sort, updateFilter }) => {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <nav className="text-xs text-zinc-500 mb-2">All Products</nav>
        <h1 className="text-2xl font-semibold text-zinc-900">All Products</h1>
        <p className="text-sm text-zinc-500 mt-1">{productsCount} product{productsCount === 1 ? '' : 's'} found</p>
      </div>

      <div className="flex items-center gap-3">
        <div>
          <select
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none"
            value={sort}
            onChange={(e) => updateFilter("sort", e.target.value)}
          >
            <option value="">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>

        <button
          className="flex items-center justify-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 md:hidden"
          onClick={() => setMobileFiltersOpen((prev) => !prev)}
        >
          {mobileFiltersOpen ? <XIcon className="size-4" /> : <SlidersHorizontalIcon className="size-4" />}
          Filters
        </button>
      </div>
    </div>
  );
};

export default ProductsHeader;
