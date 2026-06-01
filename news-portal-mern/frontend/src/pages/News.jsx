import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../api/axios";
import Loading from "../components/Loading";
import NewsCard from "../components/NewsCard";

const categories = [
  "All",
  "Politics",
  "Sports",
  "Technology",
  "Business",
  "Health",
  "Entertainment",
  "World",
  "Other",
];

const News = () => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const { data } = await API.get("/news", {
          params: { page, limit: 9, category, search },
        });
        setNews(data.news);
        setPages(data.pages || 1);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchNews, 300);
    return () => clearTimeout(timer);
  }, [category, search, page]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
        <p className="font-bold uppercase tracking-[0.2em] text-blue-700">Newsroom</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">All News</h1>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              className="w-full rounded-2xl border border-slate-200 py-3 pl-12 pr-4 outline-none focus:border-blue-600"
              placeholder="Search news..."
            />
          </div>

          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setPage(1);
            }}
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <Loading text="Loading news..." />
      ) : news.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-black">No news found</h2>
          <p className="mt-2 text-slate-600">Try another search or category.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <NewsCard key={item._id} item={item} />
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((value) => value - 1)}
              className="rounded-full bg-white px-5 py-2 font-bold text-slate-800 shadow-sm disabled:cursor-not-allowed disabled:text-slate-300"
            >
              Previous
            </button>
            <span className="font-bold text-slate-600">
              Page {page} of {pages}
            </span>
            <button
              disabled={page === pages}
              onClick={() => setPage((value) => value + 1)}
              className="rounded-full bg-white px-5 py-2 font-bold text-slate-800 shadow-sm disabled:cursor-not-allowed disabled:text-slate-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default News;
