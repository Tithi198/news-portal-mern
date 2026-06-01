import { create } from "zustand";
import API from "../api/axios";

const savedUser = localStorage.getItem("newsPortalUser");
const savedToken = localStorage.getItem("newsPortalToken");

const useAuthStore = create((set) => ({
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken || null,
  loading: false,

  login: async (formData) => {
    set({ loading: true });
    try {
      const { data } = await API.post("/auth/login", formData);
      localStorage.setItem("newsPortalToken", data.token);
      localStorage.setItem("newsPortalUser", JSON.stringify(data.user));
      set({ user: data.user, token: data.token, loading: false });
      return data;
    } catch (err) {
      set({ loading: false });
      throw err.response?.data || err;
    }
  },

  register: async (formData) => {
    set({ loading: true });
    try {
      const { data } = await API.post("/auth/register", formData);
      localStorage.setItem("newsPortalToken", data.token);
      localStorage.setItem("newsPortalUser", JSON.stringify(data.user));
      set({ user: data.user, token: data.token, loading: false });
      return data;
    } catch (err) {
      set({ loading: false });
      throw err.response?.data || err;
    }
  },

  logout: () => {
    localStorage.removeItem("newsPortalUser");
    localStorage.removeItem("newsPortalToken");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;