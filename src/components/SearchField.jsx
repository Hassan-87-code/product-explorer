function SearchField({ value, onChange }) {
  return (
    <div className="flex-1">
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Search
      </label>

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search products..."
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}

export default SearchField;