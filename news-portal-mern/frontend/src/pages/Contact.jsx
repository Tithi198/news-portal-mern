import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import API from "../api/axios";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await API.post("/contact", formData);
      toast.success("Message sent successfully");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Message sending failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 text-center">
        <p className="font-bold uppercase tracking-[0.2em] text-blue-700">Contact</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">Contact Us</h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Send a message to the editorial team. This form stores messages in MongoDB.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <Mail className="mb-4 text-blue-700" />
            <h3 className="font-black">Email</h3>
            <p className="mt-1 text-slate-600">hello@dailyscope.com</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <Phone className="mb-4 text-blue-700" />
            <h3 className="font-black">Phone</h3>
            <p className="mt-1 text-slate-600">+880 1000 000000</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <MapPin className="mb-4 text-blue-700" />
            <h3 className="font-black">Address</h3>
            <p className="mt-1 text-slate-600">Dhaka, Bangladesh</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-bold text-slate-700">Subject</label>
            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-bold text-slate-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="7"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <button
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800 disabled:bg-blue-300"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
