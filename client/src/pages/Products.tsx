import { useEffect, useState } from "react";
import { FilterIcon, SlidersHorizontalIcon, XIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types";

const mockProducts: Product[] = [
  {
    _id: "1",
    name: "Fresh Apples",
    description: "Crisp and sweet apples from local orchards.",
    price: 3.5,
    originalPrice: 4.5,
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    category: "Fruits",
    unit: "kg",
    stock: 25,
    isOrganic: true,
    rating: 4.8,
    reviewCount: 120,
    discount: 22,
    createdAt: "2024-01-02",
  },
  {
    _id: "2",
    name: "Organic Tomatoes",
    description: "Juicy tomatoes packed with flavor.",
    price: 4.2,
    originalPrice: 4.9,
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=800&q=80",
    category: "Vegetables",
    unit: "kg",
    stock: 18,
    isOrganic: true,
    rating: 4.6,
    reviewCount: 91,
    discount: 14,
    createdAt: "2024-01-04",
  },
  {
    _id: "3",
    name: "Whole Milk",
    description: "Fresh dairy milk for your home.",
    price: 2.8,
    originalPrice: 3.2,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80",
    category: "Dairy",
    unit: "liter",
    stock: 30,
    isOrganic: false,
    rating: 4.4,
    reviewCount: 67,
    discount: 12,
    createdAt: "2024-01-06",
  },
  {
    _id: "4",
    name: "Brown Rice",
    description: "Healthy staple rice with excellent texture.",
    price: 5.1,
    originalPrice: 6.0,
    image: "https://images.unsplash.com/photo-1517188102060-1c1d67a7a2b8?auto=format&fit=crop&w=800&q=80",
    category: "Pantry",
    unit: "kg",
    stock: 12,
    isOrganic: false,
    rating: 4.7,
    reviewCount: 54,
    discount: 15,
    createdAt: "2024-01-08",
  },
  {
    _id: "5",
    name: "Avocado Pack",
    description: "Creamy avocados ready for salads and toast.",
    price: 6.4,
    originalPrice: 7.2,
    image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?auto=format&fit=crop&w=800&q=80",
    category: "Fruits",
    unit: "pack",
    stock: 16,
    isOrganic: true,
    rating: 4.9,
    reviewCount: 74,
    discount: 11,
    createdAt: "2024-01-10",
  },
  {
    _id: "6",
    name: "Chicken Breast",
    description: "Lean and tender chicken breast portions.",
    price: 9.8,
    originalPrice: 11.0,
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=80",
    category: "Meat",
    unit: "kg",
    stock: 10,
    isOrganic: false,
    rating: 4.5,
    reviewCount: 88,
    discount: 11,
    createdAt: "2024-01-12",
  },
  {
    _id: "7",
    name: "Spinach Bunch",
    description: "Fresh green spinach for quick meals.",
    price: 2.2,
    originalPrice: 2.7,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
    category: "Vegetables",
    unit: "bunch",
    stock: 20,
    isOrganic: true,
    rating: 4.3,
    reviewCount: 41,
    discount: 19,
    createdAt: "2024-01-14",
  },
  {
    _id: "8",
    name: "Greek Yogurt",
    description: "Creamy yogurt with a rich texture.",
    price: 3.9,
    originalPrice: 4.4,
    image: "https://images.unsplash.com/photo-1571216332002-282d4f1cd6e8?auto=format&fit=crop&w=800&q=80",
    category: "Dairy",
    unit: "cup",
    stock: 14,
    isOrganic: false,
    rating: 4.6,
    reviewCount: 59,
    discount: 11,
    createdAt: "2024-01-16",
  },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const category = searchParams.get("category") || "";
  const organic = searchParams.get("organic") || "";
  const sort = searchParams.get("sort") || "";
  const page = searchParams.get("page") || "1";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const currentPage = Math.max(1, Number(page) || 1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 400));

      let filteredProducts = [...mockProducts];

      if (category) {
        filteredProducts = filteredProducts.filter((product) => product.category === category);
      }

      if (organic === "true") {
        filteredProducts = filteredProducts.filter((product) => product.isOrganic);
      }

      const min = Number(minPrice);
      const max = Number(maxPrice);

      if (!Number.isNaN(min) && min > 0) {
        filteredProducts = filteredProducts.filter((product) => product.price >= min);
      }

      if (!Number.isNaN(max) && max > 0) {
        filteredProducts = filteredProducts.filter((product) => product.price <= max);
      }

      if (sort === "price-asc") {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sort === "price-desc") {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
      } else if (sort === "name") {
        filteredProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      }

      const pageSize = 4;
      const total = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
      const start = (currentPage - 1) * pageSize;
      const pagedProducts = filteredProducts.slice(start, start + pageSize);

      setProducts(pagedProducts);
      setTotalPages(total);
      setLoading(false);
    };

    fetchProducts();
  }, [category, organic, sort, currentPage, minPrice, maxPrice]);

  const updateFilter = (key: string, value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }

      if (key !== "page") {
        newParams.delete("page");
      }

      return newParams;
    });
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setMobileFiltersOpen(false);
  };

  const changePage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) {
      return;
    }

    updateFilter("page", String(nextPage));
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex flex-col gap-3 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900">All Products</h1>
            <p className="text-sm text-zinc-600">Browse fresh groceries with smart filters and sorting.</p>
          </div>

          <button
            className="flex items-center justify-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 md:hidden"
            onClick={() => setMobileFiltersOpen((prev) => !prev)}
          >
            {mobileFiltersOpen ? <XIcon className="size-4" /> : <SlidersHorizontalIcon className="size-4" />}
            Filters
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
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
                <label className="mb-2 block text-sm font-medium text-zinc-700">Category</label>
                <select
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none"
                  value={category}
                  onChange={(event) => updateFilter("category", event.target.value)}
                >
                  <option value="">All categories</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Pantry">Pantry</option>
                  <option value="Meat">Meat</option>
                </select>
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

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">Sort by</label>
                <select
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none"
                  value={sort}
                  onChange={(event) => updateFilter("sort", event.target.value)}
                >
                  <option value="">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name</option>
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

          <section className="space-y-4">
            <div className="flex flex-col gap-3 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-zinc-600">
                Showing {products.length} product{products.length === 1 ? "" : "s"}
              </p>
              <div className="text-sm text-zinc-500">Page {currentPage} of {totalPages}</div>
            </div>

            {loading ? (
              <div className="rounded-3xl border border-zinc-200 bg-white p-10 text-center text-sm text-zinc-600 shadow-sm">
                Loading products...
              </div>
            ) : products.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-zinc-200 bg-white p-10 text-center text-sm text-zinc-600 shadow-sm">
                No products matched your filters.
              </div>
            )}

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
          </section>
        </div>
      </div>
    </div>
  );
};

export default Products;