export default function SearchModal({ open, onClose }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-semibold">Cari data dashboard</h2>
                        <p className="text-sm text-slate-500">Gunakan kata kunci seperti order, revenue, atau customer.</p>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-900">✕</button>
                </div>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Search dashboard..."
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                    />
                    <button className="w-full rounded-2xl bg-hijau px-5 py-3 text-white shadow-sm hover:bg-emerald-600">
                        Cari sekarang
                    </button>
                </div>
            </div>
        </div>
    );
}
