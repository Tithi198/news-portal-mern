import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import Loading from "../components/Loading";
import NewsForm from "../components/NewsForm";

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [myNews, setMyNews] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "Technology",
    imageUrl: "",
    published: true,
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await API.get("/news/my-news");
        const selected = data.find((item) => item._id === id);

        if (!selected) {
          toast.error("News not found in your dashboard");
          navigate("/dashboard");
          return;
        }

        setMyNews(selected);
        setFormData({
          title: selected.title,
          summary: selected.summary,
          content: selected.content,
          category: selected.category,
          imageUrl: selected.imageUrl || "",
          published: selected.published,
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Could not load news");
      } finally {
        setPageLoading(false);
      }
    };

    fetchNews();
  }, [id, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      await API.put(`/news/${id}`, formData);
      toast.success("News updated successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (pageLoading) return <Loading text="Loading edit form..." />;
  if (!myNews) return null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <p className="font-bold uppercase tracking-[0.2em] text-blue-700">Dashboard</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">Edit News</h1>
      </div>

      <NewsForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        loading={saving}
        buttonText="Update News"
      />
    </div>
  );
};

export default EditNews;
