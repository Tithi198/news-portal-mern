import { Menu, Newspaper, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const navLinkClass = ({ isActive }) =>
  isActive
    ? "text-blue-700 font-semibold"
    : "text-slate-700 hover:text-blue-700";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const navItems = (
    <>
      <NavLink className={navLinkClass} to="/" onClick={() => setOpen(false)}>
        Home
      </NavLink>
      <NavLink className={navLinkClass} to="/news" onClick={() => setOpen(false)}>
        News
      </NavLink>
      <NavLink className={navLinkClass} to="/contact" onClick={() => setOpen(false)}>
        Contact
      </NavLink>
      {user && (
        <>
          <NavLink className={navLinkClass} to="/dashboard" onClick={() => setOpen(false)}>
            Dashboard
          </NavLink>
          <NavLink className={navLinkClass} to="/create-news" onClick={() => setOpen(false)}>
            Publish
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="rounded-2xl bg-blue-700 p-2 text-white">
            <Newspaper size={22} />
          </span>
          <span className="text-xl font-black tracking-tight text-slate-900">
            DailyScope
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">{navItems}</nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                to="/profile"
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200"
              >
                {user.name}
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className="rounded-lg p-2 text-slate-800 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">{navItems}</nav>
          <div className="mt-4 flex flex-col gap-3">
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-slate-100 px-4 py-2 text-center font-semibold"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-slate-100 px-4 py-2 text-center font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-blue-700 px-4 py-2 text-center font-semibold text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
