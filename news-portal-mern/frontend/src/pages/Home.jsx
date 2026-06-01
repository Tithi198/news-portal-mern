import { ArrowRight, BarChart3, Globe2, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Loading from "../components/Loading";
import NewsCard from "../components/NewsCard";

const Home = () => {
  const [topNews, setTopNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [topRes, latestRes] = await Promise.all([
          API.get("/news/top?limit=6"),
          API.get("/news?limit=6"),
        ]);

        setTopNews(topRes.data);
        setLatestNews(latestRes.data.news);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) return <Loading text="Loading homepage news..." />;

  const featured = topNews[0];
  const remainingTopNews = topNews.slice(1, 6);

  return (
    <div>
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-600/20 px-4 py-2 text-sm font-bold text-blue-200">
              <Sparkles size={16} /> Real-time MERN News Portal
            </span>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Read, publish and manage news from one modern platform.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              DailyScope is a complete full-stack news website with public news pages,
              JWT authentication, dashboard, profile update and user-owned news CRUD.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/news"
                className="rounded-full bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-500"
              >
                Explore News
              </Link>
              <Link
                to="/create-news"
                className="rounded-full bg-white px-6 py-3 font-bold text-slate-950 hover:bg-slate-100"
              >
                Publish News
              </Link>
            </div>
          </div>

          {featured && (
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl">
              <img src={featured.imageUrl} alt={featured.title} className="h-72 w-full object-cover" />
              <div className="p-6">
                <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-bold">
                  Top Story
                </span>
                <h2 className="mt-4 text-2xl font-black">{featured.title}</h2>
                <p className="mt-3 line-clamp-2 text-slate-300">{featured.summary}</p>
                <Link
                  to={`/news/${featured.slug}`}
                  className="mt-5 inline-flex items-center gap-2 font-bold text-blue-200 hover:text-white"
                >
                  Read full story <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-bold uppercase tracking-[0.2em] text-blue-700">Top 6 News</p>
            <h2 className="text-3xl font-black text-slate-950">Trending stories</h2>
          </div>
          <Link to="/news" className="hidden font-bold text-blue-700 md:block">
            View all news
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {remainingTopNews.map((item) => (
            <NewsCard key={item._id} item={item} />
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8">
            <p className="font-bold uppercase tracking-[0.2em] text-blue-700">Latest</p>
            <h2 className="text-3xl font-black text-slate-950">Fresh from newsroom</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((item) => (
              <NewsCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <Globe2 className="mb-4 text-blue-700" size={34} />
            <h3 className="text-xl font-black">Multiple categories</h3>
            <p className="mt-3 text-slate-600">Politics, sports, technology, business, health and more.</p>
          </div>
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <ShieldCheck className="mb-4 text-blue-700" size={34} />
            <h3 className="text-xl font-black">Secure dashboard</h3>
            <p className="mt-3 text-slate-600">Only logged-in users can create, edit or delete their own news.</p>
          </div>
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <BarChart3 className="mb-4 text-blue-700" size={34} />
            <h3 className="text-xl font-black">API-driven content</h3>
            <p className="mt-3 text-slate-600">All news sections are rendered through Express and MongoDB API calls.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-[2rem] bg-blue-700 p-8 text-white md:p-12">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-3xl font-black">Become a reporter today</h2>
              <p className="mt-3 max-w-2xl text-blue-100">
                Register your account and publish your own news articles directly to this website.
              </p>
            </div>
            <Link
              to="/register"
              className="rounded-full bg-white px-6 py-3 text-center font-black text-blue-700 hover:bg-blue-50"
            >
              Register Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
