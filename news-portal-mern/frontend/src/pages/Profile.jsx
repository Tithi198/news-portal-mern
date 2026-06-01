import { useState } from "react";
import toast from "react-hot-toast";
import API from "../api/axios";
import useAuthStore from "../store/authStore";

const Profile = () => {
  const { user, updateLocalUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    bio: user?.bio || "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const payload = { ...formData };
      if (!payload.password) delete payload.password;

      const { data } = await API.put("/users/profile", payload);
      updateLocalUser(data);
      toast.success("Profile updated");
      setFormData((prev) => ({ ...prev, password: "" }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 rounded-[2rem] bg-white p-8 shadow-sm">
        <p className="font-bold uppercase tracking-[0.2em] text-blue-700">Profile</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">Update your information</h1>
      </div>

      <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <img
            src={
              formData.avatar ||
              `https://ui-avatars.com/api/?background=0D6EFD&color=fff&name=${formData.name}`
            }
            alt={formData.name}
            className="h-20 w-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-black">{formData.name}</h2>
            <p className="text-slate-500">{formData.email}</p>
          </div>
        </div>

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
          <label className="mb-2 block text-sm font-bold text-slate-700">Avatar URL</label>
          <input
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-bold text-slate-700">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            maxLength="300"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
            placeholder="Write short bio"
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-bold text-slate-700">New Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600"
            placeholder="Leave blank if you do not want to change password"
          />
        </div>

        <button
          disabled={loading}
          className="mt-6 w-full rounded-2xl bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800 disabled:bg-blue-300"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
