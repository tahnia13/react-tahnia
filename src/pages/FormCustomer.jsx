import React from 'react';
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function FormCustomer() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Customer Berhasil Terdaftar!");
        navigate("/customers"); // Kembali ke halaman tabel dengan 30 data
    };

    return (
        <div id="form-customer-page" className="min-h-screen bg-gray-50">
            <PageHeader title="Add New Customer" breadcrumb={["Dashboard", "Customers", "Register"]} />
            
            <div className="p-10">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto border border-gray-100">
                    <h2 className="text-2xl font-bold mb-8 text-slate-800">Registrasi Pelanggan</h2>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2 text-gray-700">Full Name</label>
                            <input type="text" className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-400 outline-none" placeholder="Masukkan nama lengkap..." required />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-700">Email Address</label>
                                <input type="email" className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-400 outline-none" placeholder="email@contoh.com" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-700">Phone Number</label>
                                <input type="tel" className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-400 outline-none" placeholder="0812..." required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 text-gray-700">Loyalty Tier</label>
                            <div className="flex gap-4 mt-2">
                                {["Bronze", "Silver", "Gold"].map((tier) => (
                                    <label key={tier} className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-lg border hover:border-green-400 transition-all">
                                        <input type="radio" name="loyalty" value={tier} defaultChecked={tier === "Bronze"} className="accent-hijau" />
                                        <span className="text-sm font-medium">{tier}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex gap-4">
                        <button type="submit" className="flex-1 bg-hijau text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-100 transition-all">
                            Daftarkan Customer
                        </button>
                        <button type="button" onClick={() => navigate("/customers")} className="flex-1 bg-gray-100 text-gray-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all">
                            Kembali
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}