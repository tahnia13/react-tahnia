import React from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function FormOrder() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika simpan data di sini (misal ke API atau State)
    alert("Order Berhasil Ditambahkan!");
    navigate("/orders"); // Kembali ke halaman tabel dengan 30 data
  };

  return (
    <div id="form-order-page" className="min-h-screen bg-gray-50">
      <PageHeader
        title="Add New Order"
        breadcrumb={["Dashboard", "Orders", "Create"]}
      />

      <div className="p-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto border border-gray-100"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">
              Detail Pesanan Baru
            </h2>
            <span className="text-hijau font-semibold">ID: ORD-AUTO</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold mb-2 text-gray-700">
                Customer Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition-all"
                placeholder="Nama Pelanggan..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                Status Order
              </label>
              <select className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition-all">
                <option>Pending</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                Total Harga (Rp)
              </label>
              <input
                type="number"
                className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition-all"
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-hijau text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-100 transition-all active:scale-95"
            >
              Simpan Order
            </button>
            <button
              type="button"
              onClick={() => navigate("/orders")}
              className="flex-1 bg-gray-100 text-gray-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
