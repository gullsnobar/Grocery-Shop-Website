import type { FC } from "react";
import { Home as HomeIcon } from "lucide-react";

interface Props {
  sort: string;
  updateFilter: (key: string, value: string) => void;
}

const ProductsHeader: FC<Props> = ({ sort, updateFilter }) => {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <HomeIcon size={18} className="text-zinc-600" />
        <div className="text-2xl font-semibold text-zinc-900">ALL Products</div>
      </div>

      <div className="flex items-center gap-3">
        {/** Sort menu bar: New, Low, High **/}
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateFilter('sort', '')}
            className={`px-3 py-2 rounded-full text-sm font-medium ${sort === '' ? 'bg-emerald-950 text-white' : 'bg-white border border-zinc-200 text-zinc-700'}`}
          >
            New
          </button>

          <button
            onClick={() => updateFilter('sort', 'price-asc')}
            className={`px-3 py-2 rounded-full text-sm font-medium ${sort === 'price-asc' ? 'bg-emerald-950 text-white' : 'bg-white border border-zinc-200 text-zinc-700'}`}
          >
            Low
          </button>

          <button
            onClick={() => updateFilter('sort', 'price-desc')}
            className={`px-3 py-2 rounded-full text-sm font-medium ${sort === 'price-desc' ? 'bg-emerald-950 text-white' : 'bg-white border border-zinc-200 text-zinc-700'}`}
          >
            High
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsHeader;
