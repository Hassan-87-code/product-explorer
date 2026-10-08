import { useEffect, useState } from "react";
import useProducts from "./hooks/useProducts";
import {
  getCategories,
  getProductById,
} from "./services/productService";

import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import SearchField from "./components/SearchField";
import CategoryFilter from "./components/CategoryFilter";
import SortControl from "./components/SortControl";
import RequestState from "./components/RequestState";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");

  const {
    items,
    total,
    loading,
    error,
  } = useProducts({
    search,
    category,
    sortBy,
    order,
    limit: 12,
    skip: 0,
  });

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadCategories();
  }, []);

  async function handleSelectProduct(id) {
    try {
      setDetailLoading(true);
      setDetailError("");

      const product = await getProductById(id);

      setSelectedProduct(product);
    } catch (err) {
      setDetailError(err.message);
    } finally {
      setDetailLoading(false);
    }
  }

  function clearFilters() {
    setSearch("");
    setCategory("");
    setSortBy("");
    setOrder("");
  }

  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <h1 className="text-2xl font-bold">
              React Product Explorer
            </h1>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-10">
          {detailLoading && (
            <p className="text-center">Loading product...</p>
          )}

          {detailError && (
            <div className="rounded-lg bg-red-50 p-5 text-red-700">
              {detailError}
            </div>
          )}

          {!detailLoading && !detailError && (
            <ProductDetail
              product={selectedProduct}
              onBack={() => setSelectedProduct(null)}
            />
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <h1 className="text-3xl font-bold">
            React Product Explorer
          </h1>

          <p className="mt-2 text-slate-300">
            Browse, search, filter, and explore our homeware catalogue.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-5 md:flex-row">
            <SearchField
              value={search}
              onChange={(value) => {
                setSearch(value);
                setCategory("");
              }}
            />

            <CategoryFilter
              value={category}
              categories={categories}
              onChange={(value) => {
                setCategory(value);
                setSearch("");
              }}
            />

            <SortControl
              sortBy={sortBy}
              order={order}
              onSortChange={(field, direction) => {
                setSortBy(field);
                setOrder(direction);
              }}
            />

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full rounded-lg bg-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-300 md:w-auto"
              >
                Clear
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Products
              </h2>

              <p className="text-sm text-slate-500">
                {total} products available
              </p>
            </div>
          </div>

          <RequestState
            loading={loading}
            error={error}
            hasProducts={items.length > 0}
            onRetry={() => window.location.reload()}
          />

          {!loading && !error && items.length > 0 && (
            <ProductGrid
              products={items}
              onSelect={handleSelectProduct}
            />
          )}
        </section>
      </main>

      <footer className="mt-12 border-t bg-white py-6 text-center text-sm text-slate-500">
        React Product Explorer • Built with React + Tailwind CSS
      </footer>
    </div>
  );
}

export default App;