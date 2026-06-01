import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mx-auto flex min-h-[500px] max-w-4xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-7xl font-black text-blue-700">404</h1>
      <h2 className="mt-3 text-3xl font-black text-slate-950">Page not found</h2>
      <p className="mt-3 text-slate-600">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-6 rounded-full bg-blue-700 px-6 py-3 font-bold text-white hover:bg-blue-800"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
