import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuthStore();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await register(formData);
      toast.success("Registration successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-150px)] max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2">
      <div>
        <p className="font-bold uppercase tracking-[0.2em] text-blue-700">Join DailyScope</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950 md:text-5xl">
          Create your reporter account.
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          After registration, you can create, publish, edit and delete your own news posts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-7 shadow-sm">
        <h2 className="mb-6 text-2xl font-black">Register</h2>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-slate-700">Name</label>
          <input
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            required
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
            placeholder="Your name"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-slate-700">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            required
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold text-slate-700">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(event) => setFormData({ ...formData, password: event.target.value })}
            required
            minLength="6"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
            placeholder="Minimum 6 characters"
          />
        </div>

        <button
          disabled={loading}
          className="w-full rounded-2xl bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800 disabled:bg-blue-300"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-600">
          Already registered?{" "}
          <Link to="/login" className="font-bold text-blue-700">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
