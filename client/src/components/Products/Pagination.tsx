import type { FC } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  changePage: (next: number) => void;
}

const Pagination: FC<Props> = ({ currentPage, totalPages, changePage }) => {
  return (
    <div className="flex items-center justify-center gap-2 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
      <button
        className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-sm font-medium text-zinc-700">{currentPage}</span>
      <button
        className="rounded-full border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
