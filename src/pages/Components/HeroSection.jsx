export default function HeroSection({ title, subtitle, buttonText, image, onButtonClick }) {
  return (
    <div className="bg-gradient-to-r from-hijau to-emerald-600 text-white py-16 px-4 rounded-2xl">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl mb-8 opacity-90">{subtitle}</p>
        <button 
          onClick={onButtonClick}
          className="bg-white text-hijau px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}