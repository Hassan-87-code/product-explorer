function SortControl({ sortBy, order, onSortChange }) {
  const value = sortBy ? sortBy + "-" + order : "";

  function handleChange(event) {
    const selected = event.target.value;

    if (!selected) {
      onSortChange("", "");
      return;
    }

    const [field, direction] = selected.split("-");

    onSortChange(field, direction);
  }

  return (
    <div className="w-full md:w-56">
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Sort by
      </label>

      <select
        value={value}
        onChange={handleChange}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      >
        <option value="">Default</option>
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
        <option value="price-asc">Price Low-High</option>
        <option value="price-desc">Price High-Low</option>
        <option value="rating-desc">Rating High-Low</option>
      </select>
    </div>
  );
}

export default SortControl;