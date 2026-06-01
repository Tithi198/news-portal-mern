const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div className="rounded-2xl bg-white px-6 py-4 text-center shadow-sm">
        <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-700" />
        <p className="text-sm font-semibold text-slate-600">{text}</p>
      </div>
    </div>
  );
};

export default Loading;
