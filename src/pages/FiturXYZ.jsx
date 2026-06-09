import React, { useState } from 'react';
// 1. Pastikan semua sub-komponen Card dan UI lainnya di-import dengan benar
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

// Data 10 Berita Nasional Terkini (Update 2026)
const newsData = [
  {
    id: 1,
    title: "Tantangan Penurunan Daya Beli Kelas Menengah",
    description: "Pemerintah sedang mengkaji strategi stimulus fiskal guna menangani penurunan daya beli masyarakat.",
    category: "EKONOMI",
    status: "Kritis",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
    date: "26 Mei 2026",
  },
  {
    id: 2,
    title: "Sinergi Pemberantasan Judi Online & Keamanan Siber",
    description: "Kementerian Komunikasi bersama POLRI memperketat sistem keamanan guna memblokir situs judol.",
    category: "HUKUM",
    status: "Sangat Penting",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
    date: "25 Mei 2026",
  },
  {
    id: 3,
    title: "Optimalisasi Adopsi AI di Birokrasi Publik",
    description: "Implementasi AI mulai diterapkan secara bertahap guna mendongkrak efisiensi birokrasi.",
    category: "TEKNOLOGI",
    status: "Sedang Berjalan",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80",
    date: "24 Mei 2026",
  },
  {
    id: 4,
    title: "Akselerasi Transisi Energi Hijau & Solar Panel",
    description: "Pemerintah mendorong percepatan bauran energi terbarukan melalui perluasan insentif solar panel.",
    category: "LINGKUNGAN",
    status: "Kritis",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80",
    date: "23 Mei 2026",
  },
  {
    id: 5,
    title: "Perluasan Rute MRT & LRT ke Kota Satelit",
    description: "Kemenhub merancang masterplan perluasan transportasi rel modern guna menekan polusi.",
    category: "INFRA",
    status: "Sedang Berjalan",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=600&q=80",
    date: "22 Mei 2026",
  },
  {
    id: 6,
    title: "Modernisasi Alsintan Pertanian Berbasis IoT",
    description: "Kementerian Pertanian mendistribusikan alat mesin pertanian modern untuk stabilitas beras.",
    category: "PERTANIAN",
    status: "Sangat Penting",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=600&q=80",
    date: "20 Mei 2026",
  },
  {
    id: 7,
    title: "Penerapan Coding Sebagai Kurikulum Wajib SMK",
    description: "Kemendikbud memfokuskan kurikulum SMK pada keahlian digital coding dan data analytics.",
    category: "PENDIDIKAN",
    status: "Sedang Berjalan",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    date: "19 Mei 2026",
  },
  {
    id: 8,
    title: "Pemerataan RS Apung di Wilayah Terluar",
    description: "Kemenkes meresmikan rumah sakit apung guna memotong kesenjangan akses medis.",
    category: "KESEHATAN",
    status: "Kritis",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
    date: "18 Mei 2026",
  },
  {
    id: 9,
    title: "Kampanye Pariwisata Hijau Desa Adat Bali",
    description: "Kemenparekraf meluncurkan kampanye pariwisata yang ramah lingkungan dan adat.",
    category: "WISATA",
    status: "Sedang Berjalan",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
    date: "15 Mei 2026",
  },
  {
    id: 10,
    title: "Jaminan Sosial bagi Mitra Driver Ojol",
    description: "Kemenaker menyusun aturan baru terkait jaminan kesehatan bagi pekerja gig economy.",
    category: "KERJA",
    status: "Sangat Penting",
    image: "https://images.unsplash.com/photo-1521791136368-1a46827d3ad4?auto=format&fit=crop&w=600&q=80",
    date: "12 Mei 2026",
  },
];

export default function FiturXYZ() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = newsData.filter(news =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="fitur-xyz-page" className="mt-2 space-y-6">
      
      {/* 1. REKAYASA PAGE HEADER */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/70">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Fitur XYZ</h2>
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1.5 font-medium">
          <span className="hover:text-gray-600 transition cursor-pointer">Dashboard</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-semibold">Fitur XYZ</span>
        </div>
      </div>

      {/* 2. TOMBOL-TOMBOL BATAL (Kembali Dihidupkan) */}
      <div className="flex flex-wrap gap-3 p-2 bg-white rounded-xl border border-gray-100 shadow-sm w-fit">
        <Button variant="outline">Batal</Button>
        <Button variant="ghost">Batal</Button>
        <Button variant="destructive">Batal</Button>
      </div>

      {/* 3. KOMPONEN CARD SHADCN/UI */}
      <Card className="w-full md:w-95 bg-white border border-gray-100 shadow-sm rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-gray-900">Belajar shadcn/ui</CardTitle>
            <Badge variant="secondary" className="bg-gray-100 text-gray-800 text-[10px] font-semibold">Baru</Badge>
          </div>
          <CardDescription className="text-xs text-gray-400 mt-1">
            Contoh penggunaan komponen shadcn/ui di React
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-xs text-gray-500 leading-relaxed">
            Komponen ini dibuat di branch <strong className="text-gray-800 font-semibold">setup-shadcn</strong> lalu di-merge ke main.
          </p>
        </CardContent>

        <CardFooter className="flex gap-2 border-t border-gray-50 pt-4">
          <Button size="sm" className="bg-gray-900 text-white hover:bg-gray-800 text-xs px-4">Simpan</Button>
          <Button size="sm" variant="outline" className="text-xs px-4">Batal</Button>
        </CardFooter>
      </Card>

      {/* 4. KONTAINER UTAMA KONTEN BERITA */}
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
        
        {/* Header di dalam Card & Fitur Cari */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 tracking-tight uppercase">Tracking Isu Nasional</h3>
            <p className="text-sm text-gray-400 mt-0.5">Pantauan 10 Isu Prioritas Publik Indonesia</p>
          </div>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari isu..."
              className="w-full md:w-64 pl-4 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 text-sm"
            />
          </div>
        </div>

        {/* 5. GRID BERITA (2 KOLOM) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredData.map(news => (
            <div key={news.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
              {/* Foto Berita */}
              <div className="aspect-video overflow-hidden bg-gray-200">
                <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              
              {/* Isi Berita */}
              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                   <span className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-1 rounded uppercase tracking-wider">{news.category}</span>
                   <span className={`text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 
                      ${news.status === 'Kritis' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${news.status === 'Kritis' ? 'bg-red-500' : 'bg-amber-500'}`}></span>
                      {news.status}
                   </span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">{news.title}</h4>
                <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">{news.description}</p>
                <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                  <span className="text-[10px] text-gray-400 italic">Update: {news.date}</span>
                  <button className="text-[11px] font-bold text-green-600 hover:text-green-700">DETAIL ISU &rarr;</button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}