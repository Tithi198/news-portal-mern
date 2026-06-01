const categories = [
  "Politics",
  "Sports",
  "Technology",
  "Business",
  "Health",
  "Entertainment",
  "World",
  "Other",
];

const NewsForm = ({ formData, setFormData, onSubmit, loading, buttonText }) => {
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-3xl bg-white p-6 shadow-sm">
      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700">Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
          placeholder="Enter news title"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700">Summary</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          required
          rows="3"
          maxLength="300"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
          placeholder="Short summary within 300 characters"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows="10"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
          placeholder="Write full news details"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">Image URL</label>
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
        <input
          type="checkbox"
          name="published"
          checked={formData.published}
          onChange={handleChange}
          className="h-5 w-5"
        />
        <span className="font-semibold text-slate-700">Publish this news</span>
      </label>

      <button
        disabled={loading}
        className="w-full rounded-2xl bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {loading ? "Saving..." : buttonText}
      </button>
    </form>
  );
};

export default NewsForm;
