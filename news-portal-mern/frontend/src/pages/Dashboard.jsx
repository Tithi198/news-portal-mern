import { Edit, FilePlus2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Loading from "../components/Loading";
import useAuthStore from "../store/authStore";

const Dashboard = () => {
  const { user } = useAuthStore();
  const [myNews, setMyNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyNews = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/news/my-news");
      setMyNews(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load your news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyNews();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this news?");
    if (!confirmed) return;

    try {
      await API.delete(`/news/${id}`);
      toast.success("News deleted");
      setMyNews((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <Loading text="Loading dashboard..." />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 rounded-[2rem] bg-slate-950 p-8 text-white">
        <p className="font-bold uppercase tracking-[0.2em] text-blue-300">Dashboard</p>
        <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-black">Hello, {user?.name}</h1>
            <p className="mt-2 text-slate-300">Manage your published news articles here.</p>
          </div>
          <Link
            to="/create-news"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-500"
          >
            <FilePlus2 size={18} /> Create News
          </Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase text-slate-500">Total posts</p>
          <h2 className="mt-2 text-4xl font-black">{myNews.length}</h2>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase text-slate-500">Published</p>
          <h2 className="mt-2 text-4xl font-black">
            {myNews.filter((item) => item.published).length}
          </h2>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase text-slate-500">Total views</p>
          <h2 className="mt-2 text-4xl font-black">
            {myNews.reduce((sum, item) => sum + (item.views || 0), 0)}
          </h2>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h2 className="text-2xl font-black">My News</h2>
        </div>

        {myNews.length === 0 ? (
          <div className="p-8 text-center">
            <h3 className="text-xl font-black">You have not published any news yet.</h3>
            <Link to="/create-news" className="mt-4 inline-block font-bold text-blue-700">
              Create your first news
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {myNews.map((item) => (
              <div key={item._id} className="grid gap-4 p-5 md:grid-cols-[100px_1fr_auto] md:items-center">
                <img src={item.imageUrl} alt={item.title} className="h-24 w-full rounded-2xl object-cover md:w-24" />
                <div>
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      {item.category}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                      {item.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <h3 className="font-black text-slate-950">{item.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">{item.summary}</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/edit-news/${item._id}`}
                    className="rounded-xl bg-slate-100 p-3 text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="rounded-xl bg-red-50 p-3 text-red-600 hover:bg-red-100"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
