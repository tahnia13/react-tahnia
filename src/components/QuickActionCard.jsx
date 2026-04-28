import { FaBolt } from "react-icons/fa";

export default function QuickActionCard({ title, description, buttonText }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
          <FaBolt className="text-xl" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
      <button className="rounded-2xl bg-hijau px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-600">
        {buttonText}
      </button>
    </div>
  );
}
