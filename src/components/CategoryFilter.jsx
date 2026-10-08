function CategoryFilter({ value, categories, onChange }) {
  return (
    <div className="w-full md:w-56">
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Category
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      >
        <option value="">All categories</option>

        {categories.map((category) => (
          <option
            key={category.slug || category}
            value={category.slug || category}
          >
            {category.name || category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;