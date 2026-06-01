import { Facebook, Instagram, Mail, Newspaper, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-2xl bg-blue-600 p-2 text-white">
              <Newspaper size={22} />
            </span>
            <span className="text-xl font-black text-white">DailyScope</span>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-400">
            A modern full-stack news portal where registered users can publish,
            edit and manage their own news articles.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-white">Pages</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/news" className="hover:text-white">News</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
            <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-white">Connect</h3>
          <div className="mb-4 flex gap-3">
            <span className="rounded-full bg-slate-800 p-2"><Facebook size={18} /></span>
            <span className="rounded-full bg-slate-800 p-2"><Twitter size={18} /></span>
            <span className="rounded-full bg-slate-800 p-2"><Instagram size={18} /></span>
          </div>
          <p className="flex items-center gap-2 text-sm">
            <Mail size={16} /> hello@dailyscope.com
          </p>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} DailyScope. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
