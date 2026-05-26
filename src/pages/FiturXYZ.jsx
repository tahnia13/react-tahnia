import React, { useState } from 'react';
import PageHeader from "../components/PageHeader";

// Data Isu Terkini Indonesia 2026
const dataIsuAwal = [
  {
    id: 1,
    topik: "Ekonomi & Daya Beli Kelas Menengah",
    deskripsi: "Tantangan penurunan ekonomi kelas menengah serta strategi stimulus domestik.",
    kategori: "Ekonomi",
    status: "Kritis",
    tanggal: "24 Mei 2026"
  },
  {
    id: 2,
    topik: "Pemberantasan Judi Online",
    deskripsi: "Sinergi lintas kementerian dalam memblokir situs judi dan melacak aliran dana.",
    kategori: "Hukum & Keamanan",
    status: "Sangat Penting",
    tanggal: "22 Mei 2026"
  },
  {
    id: 3,
    topik: "Adopsi AI di Sektor Publik",
    deskripsi: "Implementasi kecerdasan buatan untuk efisiensi birokrasi dan pelayanan publik.",
    kategori: "Teknologi",
    status: "Sedang Berjalan",
    tanggal: "18 Mei 2026"
  },
  {
    id: 4,
    topik: "Transisi Energi Hijau",
    deskripsi: "Evaluasi target bauran energi terbarukan dan pensiun dini PLTU batu bara.",
    kategori: "Lingkungan",
    status: "Sangat Penting",
    tanggal: "15 Mei 2026"
  },
];

export default function FiturXYZ() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data berdasarkan input pencarian
  const filteredData = dataIsuAwal.filter((item) =>
    item.topik.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.kategori.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper untuk warna badge status urgensi
  const getStatusColor = (status) => {
    switch (status) {
      case 'Kritis': return 'bg-red-100 text-red-800 border-red-200';
      case 'Sangat Penting': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Sedang Berjalan': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div id="fitur-xyz-page" className="mt-6">
      <PageHeader title="Fitur XYZ" breadcrumbs={["fitur XYZ"]} />
      
      <div className="rounded-3xl bg-white p-8 shadow-sm mt-6">
        {/* Bagian Konten Atas & Fitur Pencarian */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Tracking Isu Nasional Indonesia</h3>
            <p className="text-sm text-gray-500 mt-1">Daftar isu-isu strategis yang sedang menjadi sorotan publik dan media.</p>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari isu atau kategori..."
              className="w-full md:w-64 pl-4 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-700 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tabel Responsif */}
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500 tracking-wider">
              <tr>
                <th className="px-6 py-4">Topik Isu</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Tingkat Urgensi</th>
                <th className="px-6 py-4">Pembaruan Terakhir</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white text-gray-600">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 max-w-sm">
                      <div className="font-semibold text-gray-900">{item.topik}</div>
                      <div className="text-xs text-gray-400 line-clamp-2 mt-1">{item.deskripsi}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md font-medium">
                        {item.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block border text-xs px-2.5 py-1 rounded-full font-semibold ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                      {item.tanggal}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => alert(`Membuka berkas pantauan untuk: ${item.topik}`)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-900 transition"
                      >
                        Pantau Isu
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-400">
                    Tidak ada isu yang cocok dengan pencarian Anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Informasi Jumlah Data */}
        <div className="mt-4 text-xs text-gray-400 text-right">
          Menampilkan {filteredData.length} dari {dataIsuAwal.length} isu utama.
        </div>
      </div>
    </div>
  );
}