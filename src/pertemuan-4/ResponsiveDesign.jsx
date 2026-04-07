import { useState } from "react";

function ResponsiveText() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <p className="text-sm md:text-lg lg:text-xl xl:text-2xl text-gray-700">
         Coba lakukan zoom in atau zoom out. Perhatikan bahwa ukuran teks akan menyesuaikan dengan ukuran layar.
        <br />
        <span className="text-xs md:text-sm text-gray-400">Coba hapus class breakpoint (md:xxx, lg:xxx, xl:xxx) dan lihat perbedaannya!</span>
      </p>
      
      <button 
        className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-purple-600 hover:scale-105 hover:shadow-lg active:scale-95"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? " Mantap!" : "Coba Hover Aku"}
      </button>
    </div>
  );
}

function ResponsiveWidth() {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <p className="text-gray-700 mb-3">
        🖱️ Coba zoom atau ubah ukuran layar, perhatikan perubahan posisi kolom:
      </p>
      
      <div className="flex flex-col md:flex-row gap-3 mb-3">
        <div className={`bg-red-500 w-full md:w-1/2 p-4 rounded-lg text-white font-semibold text-center transition-all duration-300 ${isAnimating ? 'animate-pulse scale-105' : ''}`}>
          Kolom 1
        </div>
        <div className={`bg-blue-500 w-full md:w-1/2 p-4 rounded-lg text-white font-semibold text-center transition-all duration-300 ${isAnimating ? 'animate-pulse scale-105' : ''}`}>
          Kolom 2
        </div>
      </div>
      
      <button 
        onClick={handleClick}
        className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95 transform"
      >
        {isAnimating ? " Animasi!" : " Klik untuk Animasi Kolom"}
      </button>
      
      <p className="text-xs text-gray-500 mt-3">
         Mobile: vertikal | Tablet+: horizontal (50% lebar)
      </p>
    </div>
  );
}

function ResponsiveLayout() {
  const [activeBox, setActiveBox] = useState(null);
  
  const boxes = [
    { id: 1, name: "Box 1", color: "from-blue-500 to-blue-600"},
    { id: 2, name: "Box 2", color: "from-green-500 to-green-600"},
    { id: 3, name: "Box 3", color: "from-purple-500 to-purple-600"},
    { id: 4, name: "Box 4", color: "from-orange-500 to-orange-600"},
  ];
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <p className="text-gray-700 mb-3">
         Grid akan berubah jumlah kolom sesuai ukuran layar:
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {boxes.map((box) => (
          <button
            key={box.id}
            onClick={() => setActiveBox(box.id)}
            className={`bg-gradient-to-r ${box.color} p-4 rounded-lg text-white text-center font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 transform ${
              activeBox === box.id ? 'ring-4 ring-yellow-400 scale-105' : ''
            }`}
          >
            <div className="text-2xl mb-1">{box.emoji}</div>
            {box.name}
          </button>
        ))}
      </div>
      
      <button 
        onClick={() => setActiveBox(null)}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-gray-600 hover:scale-105 active:scale-95 w-full"
      >
        Reset Animasi Box
      </button>
      
      <p className="text-xs text-gray-500 mt-3">
         1 kolom →  2 kolom (sm) →  3 kolom (md) →  4 kolom (lg)
      </p>
    </div>
  );
}

export default function ResponsiveDesign() {
  const [isVisible, setIsVisible] = useState(true);
  
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Responsive Design Demo
        </h1>
        
        <button 
          onClick={() => setIsVisible(!isVisible)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 transform"
        >
          {isVisible ? " Sembunyikan" : " Tampilkan"} Demo
        </button>
      </div>
      
      <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none hidden'}`}>
        <ResponsiveText />
        <ResponsiveWidth />
        <ResponsiveLayout />
      </div>
    </div>
  );
}