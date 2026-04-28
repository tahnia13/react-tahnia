import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = ({ kodeError, deskripsiError, gambarError }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center bg-gray-50">
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">
        Error {kodeError}
      </p>

      {/* Container Gambar */}
      <div className="w-64 md:w-80 h-64 mb-8 flex items-center justify-center">
        <img
          src={
            gambarError ||
            "https://illustrations.popsy.co/gray/status-code-404.svg"
          }
          alt={`Error ${kodeError}`}
          className="max-w-full max-h-full object-contain"
          // Fungsi ini dijalankan jika gambar dari prop gagal dimuat
          onError={(e) => {
            e.target.src = "https://illustrations.popsy.co/gray/not-found.svg";
          }}
        />
      </div>

      <h1 className="text-7xl font-extrabold text-slate-800 mb-4">
        {kodeError}
      </h1>

      <p className="text-slate-500 text-lg max-w-md mb-10 leading-relaxed">
        {deskripsiError}
      </p>

      <Link
        to="/"
        className="bg-hijau text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 hover:scale-105 active:scale-95"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default ErrorPage;
