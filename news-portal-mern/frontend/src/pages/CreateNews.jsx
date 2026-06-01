import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import NewsForm from "../components/NewsForm";

const CreateNews = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "Technology",
    imageUrl: "",
    published: true,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await API.post("/news", formData);
      toast.success("News published successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not publish news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <p className="font-bold uppercase tracking-[0.2em] text-blue-700">Publish</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">Create News</h1>
      </div>

      <NewsForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        loading={loading}
        buttonText="Publish News"
      />
    </div>
  );
};

export default CreateNews;
