function ProductCard({ product, onSelect }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">
        <p className="text-sm capitalize text-slate-500">
          {product.category}
        </p>

        <h2 className="mt-1 min-h-14 text-lg font-bold text-slate-900">
          {product.title}
        </h2>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-bold text-blue-600">
            ${product.price}
          </p>

          <p className="text-sm text-slate-600">
            ⭐ {product.rating}
          </p>
        </div>

        <button
          onClick={() => onSelect(product.id)}
          className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-600"
        >
          View Product
        </button>
      </div>
    </article>
  );
}

export default ProductCard;