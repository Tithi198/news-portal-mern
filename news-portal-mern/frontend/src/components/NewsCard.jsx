import { CalendarDays, Eye, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const NewsCard = ({ item, featured = false }) => {
  return (
    <article
      className={`overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
        featured ? "md:grid md:grid-cols-2" : ""
      }`}
    >
      <Link to={`/news/${item.slug}`} className="block">
        <img
          src={item.imageUrl}
          alt={item.title}
          className={`w-full object-cover ${featured ? "h-full min-h-[320px]" : "h-52"}`}
        />
      </Link>

      <div className="flex flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
            {item.category}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays size={14} /> {formatDate(item.createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={14} /> {item.views || 0}
          </span>
        </div>

        <Link to={`/news/${item.slug}`}>
          <h2
            className={`font-black leading-tight text-slate-950 hover:text-blue-700 ${
              featured ? "text-3xl" : "text-xl"
            }`}
          >
            {item.title}
          </h2>
        </Link>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {item.summary}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-600">
            <UserRound size={16} />
            {item.author?.name || "Unknown"}
          </span>
          <Link
            to={`/news/${item.slug}`}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
          >
            Read
          </Link>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
