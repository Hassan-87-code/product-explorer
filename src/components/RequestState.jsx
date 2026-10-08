function RequestState({ loading, error, hasProducts, onRetry }) {
  if (loading) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow-sm">
        <p className="text-lg font-semibold text-slate-700">
          Loading products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-10 text-center ring-1 ring-red-200">
        <p className="text-lg font-bold text-red-700">
          Something went wrong
        </p>

        <p className="mt-2 text-red-600">{error}</p>

        <button
          onClick={onRetry}
          className="mt-5 rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!hasProducts) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow-sm">
        <p className="text-lg font-semibold text-slate-700">
          No products found.
        </p>
      </div>
    );
  }

  return null;
}

export default RequestState;