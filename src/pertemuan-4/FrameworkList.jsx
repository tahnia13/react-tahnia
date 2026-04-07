import frameworkData from "./framework.json";

export default function FrameworkList() {
  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-12 text-slate-200 selection:bg-cyan-500/30">
      {/* Container Utama tanpa judul */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {frameworkData.map((item) => (
          <div
            key={item.id}
            className="group relative h-[420px] [perspective:1000px]"
          >
            {/* Animasi Tekan: active:scale-95 & active:[rotateX(5deg)] */}
            <div className="relative h-full w-full rounded-[3rem] bg-slate-900/50 border border-white/10 p-8 
                            transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                            hover:border-cyan-500/50 hover:shadow-[0_0_50px_-12px_rgba(6,182,212,0.5)]
                            active:scale-[0.94] active:[transform:rotateX(10deg)] cursor-pointer
                            overflow-hidden flex flex-col justify-between"
            >
              {/* Background Glow Dinamis */}
              <div className="absolute -inset-24 bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl" />

              <div className="relative z-10">
                {/* Header Kartu: Ikon & Badge */}
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-black border border-white/10 
                                  flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 
                                  group-active:scale-90 transition-all duration-500 shadow-2xl">
                    <span className="text-3xl font-black italic bg-gradient-to-br from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                      {item.name[0]}
                    </span>
                  </div>
                  <div className="px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                      v.{item.details?.releaseYear}
                    </span>
                  </div>
                </div>

                {/* Info Utama */}
                <h2 className="text-3xl font-black text-white mb-4 tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                  {item.name}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 group-hover:text-slate-300 transition-colors">
                  {item.description}
                </p>
              </div>

              {/* Bagian Bawah */}
              <div className="relative z-10">
                <div className="flex flex-wrap gap-2 mb-8 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="text-[9px] font-bold px-2 py-1 rounded bg-white/5 border border-white/5 uppercase tracking-tighter">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Tombol dengan animasi Ripple-ish */}
                <a
                  href={item.details?.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group/btn flex items-center justify-center w-full py-4 rounded-2xl 
                             bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm
                             overflow-hidden transition-all duration-300 
                             hover:shadow-[0_10px_20px_-10px_rgba(6,182,212,0.5)]
                             active:scale-95 group-active:translate-y-1"
                >
                  <span className="relative z-10 flex items-center gap-2 tracking-widest uppercase text-[10px]">
                    Launch Explorer
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  
                  {/* Efek Shine saat Hover */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                  -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Keyframes untuk efek Shimmer Tombol */}
      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}