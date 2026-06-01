import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuthStore();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(formData);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-150px)] max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2">
      <div>
        <p className="font-bold uppercase tracking-[0.2em] text-blue-700">Welcome back</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950 md:text-5xl">
          Login to publish and manage your news.
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Use your registered email and password to access your dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-7 shadow-sm">
        <h2 className="mb-6 text-2xl font-black">Login</h2>

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
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
            placeholder="******"
          />
        </div>

        <button
          disabled={loading}
          className="w-full rounded-2xl bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800 disabled:bg-blue-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-600">
          New here?{" "}
          <Link to="/register" className="font-bold text-blue-700">
            Create account
          </Link>
        </p>

        <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
          Seed demo login: <b>demo@example.com</b> / <b>123456</b>
        </p>
      </form>
    </div>
  );
};

export default Login;
