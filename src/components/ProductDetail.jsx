function ProductDetail({ product, onBack }) {
  if (!product) {
    return null;
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <button
        onClick={onBack}
        className="mb-6 rounded-lg bg-slate-100 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-200"
      >
        ← Back to Products
      </button>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full rounded-2xl object-cover"
          />
        </div>

        <div>
          <p className="text-sm capitalize text-blue-600">
            {product.category}
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            {product.title}
          </h1>

          <p className="mt-4 text-3xl font-bold text-blue-600">
            ${product.price}
          </p>

          <p className="mt-3 text-slate-600">
            ⭐ {product.rating}
          </p>

          <p className="mt-6 leading-7 text-slate-600">
            {product.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-slate-100 p-4">
              <p className="text-sm text-slate-500">Brand</p>
              <p className="font-semibold">{product.brand || "N/A"}</p>
            </div>

            <div className="rounded-lg bg-slate-100 p-4">
              <p className="text-sm text-slate-500">Stock</p>
              <p className="font-semibold">{product.stock}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
