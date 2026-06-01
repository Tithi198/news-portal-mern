import { CalendarDays, Eye, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../api/axios";
import Loading from "../components/Loading";

const NewsDetails = () => {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/news/${slug}`);
        setNews(data);

        const relatedRes = await API.get("/news", {
          params: { category: data.category, limit: 3 },
        });
        setRelated(relatedRes.data.news.filter((item) => item.slug !== slug).slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [slug]);

  if (loading) return <Loading text="Loading news details..." />;
  if (!news) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <article className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
        <img src={news.imageUrl} alt={news.title} className="h-[420px] w-full object-cover" />

        <div className="p-6 md:p-10">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500">
            <span className="rounded-full bg-blue-50 px-4 py-2 text-blue-700">
              {news.category}
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays size={16} />
              {new Date(news.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={16} />
              {news.views} views
            </span>
          </div>

          <h1 className="text-3xl font-black leading-tight text-slate-950 md:text-5xl">
            {news.title}
          </h1>

          <p className="mt-5 border-l-4 border-blue-700 pl-5 text-xl font-semibold leading-8 text-slate-600">
            {news.summary}
          </p>

          <div className="mt-6 flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
            <img
              src={
                news.author?.avatar ||
                "https://ui-avatars.com/api/?background=0D6EFD&color=fff&name=Reporter"
              }
              alt={news.author?.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="flex items-center gap-2 font-black text-slate-900">
                <UserRound size={16} /> {news.author?.name}
              </p>
              <p className="text-sm text-slate-500">{news.author?.bio || "News contributor"}</p>
            </div>
          </div>

          <div className="prose prose-slate mt-8 max-w-none">
            {news.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-5 text-lg leading-9 text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-5 text-2xl font-black text-slate-950">Related News</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item._id}
                to={`/news/${item.slug}`}
                className="overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-lg"
              >
                <img src={item.imageUrl} alt={item.title} className="h-36 w-full object-cover" />
                <div className="p-4">
                  <p className="line-clamp-2 font-black text-slate-950">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default NewsDetails;
