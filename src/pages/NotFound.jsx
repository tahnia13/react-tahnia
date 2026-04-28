import { Link } from "react-router-dom";

export default function ErrorPage({
  errorCode,
  errorTitle,
  errorDesc,
  errorImg,
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center">
      <img
        src="/img/eror.png"
        alt="Error Illustration"
        className="w-30 md:w-60 mb-8"
      />
      <h1 className="text-8xl font-black text-slate-100 absolute opacity-40 -z-10 hidden md:block">
        {errorCode}
      </h1>
      <h2 className="text-3xl font-bold text-slate-800">{errorTitle}</h2>
      <p className="text-slate-500 max-w-md mt-2 mb-8">{errorDesc}</p>
      <Link
        to="/"
        className="bg-emerald-500 text-white px-8 py-3 rounded-xl hover:bg-emerald-600 font-bold transition-all shadow-lg shadow-emerald-100"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
