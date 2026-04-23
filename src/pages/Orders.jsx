import React from 'react';
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function Orders() {
    const navigate = useNavigate();

    // Data JSON 30 baris sesuai instruksi
    const orders = Array.from({ length: 30 }, (_, i) => ({
        id: `ORD-99${i + 1}`,
        customer: ["Ahmad", "Siti", "Budi", "Dewi", "Eko"][i % 5],
        status: ["Pending", "Completed", "Cancelled"][i % 3],
        price: Math.floor(Math.random() * 500000) + 50000,
        date: "2026-04-23"
    }));

    return (
        <div id="orders-page">
            <PageHeader title="Order" breadcrumb={["Dashboard", "Order List"]}>
                <button 
                    onClick={() => navigate("/add-orders")}
                    className="bg-hijau text-white px-6 py-2 rounded-lg hover:bg-emerald-600 font-bold shadow-md transition-all active:scale-95"
                >
                    + Add New Order
                </button>
            </PageHeader>
            
            <div className="p-5">
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                    <div className="p-6 border-b border-gray-50">
                        <h2 className="text-xl font-bold text-slate-800">Order</h2>
                        <p className="text-gray-400 text-sm">Ini Halaman Order</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                                <tr>
                                    <th className="p-4 font-bold">Order ID</th>
                                    <th className="p-4 font-bold">Customer Name</th>
                                    <th className="p-4 font-bold">Status</th>
                                    <th className="p-4 font-bold">Total Price</th>
                                    <th className="p-4 font-bold">Order Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.map((ord) => (
                                    <tr key={ord.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-sky-600 font-mono font-bold">{ord.id}</td>
                                        <td className="p-4 font-medium">{ord.customer}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                                ord.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                                                ord.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                                            }`}>
                                                {ord.status}
                                            </span>
                                        </td>
                                        <td className="p-4 font-bold">Rp {ord.price.toLocaleString('id-ID')}</td>
                                        <td className="p-4 text-gray-500 text-sm">{ord.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}