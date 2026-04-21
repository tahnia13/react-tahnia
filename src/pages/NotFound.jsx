import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <h1 className="text-6xl font-bold text-hijau mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">Halaman Tidak Ditemukan</h2>
                <p className="text-gray-600 mb-8">
                    Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
                </p>
                <Link 
                    to="/" 
                    className="inline-block bg-hijau text-white px-8 py-3 rounded-lg hover:bg-emerald-600 font-semibold transition"
                >
                    Kembali ke Dashboard
                </Link>
            </div>
        </div>
    );
}