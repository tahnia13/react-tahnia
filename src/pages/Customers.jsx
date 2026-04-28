import React from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function Customers() {
  const navigate = useNavigate();

  // Data JSON 30 baris sesuai atribut: ID, Name, Email, Phone, Loyalty
  const customers = Array.from({ length: 30 }, (_, i) => ({
    id: `CUST-${1000 + i}`,
    name:
      [
        "Andi Pratama",
        "Siti Aminah",
        "Budi Santoso",
        "Rina Wijaya",
        "Dewi Lestari",
      ][i % 5] + ` ${i + 1}`,
    email: `user${i + 1}@sedap-resto.com`,
    phone: `0812-3456-78${i.toString().padStart(2, "0")}`,
    loyalty: ["Bronze", "Silver", "Gold"][i % 3],
  }));

  return (
    <div id="customers-page">
      <PageHeader title="Customer" breadcrumb={["Dashboard", "Customer List"]}>
        <button
          onClick={() => navigate("/add-customers")}
          className="bg-hijau text-white px-6 py-2 rounded-lg hover:bg-emerald-600 font-bold shadow-md transition-all active:scale-95"
        >
          + Add New Customer
        </button>
      </PageHeader>

      <div className="p-5">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-50">
            <h2 className="text-xl font-bold text-slate-800">Customer</h2>
            <p className="text-gray-400 text-sm">Ini Halaman Customer</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                <tr>
                  <th className="p-4 font-bold">Customer ID</th>
                  <th className="p-4 font-bold">Customer Name</th>
                  <th className="p-4 font-bold">Email</th>
                  <th className="p-4 font-bold">Phone</th>
                  <th className="p-4 font-bold">Loyalty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customers.map((cust) => (
                  <tr
                    key={cust.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-hijau font-mono font-bold">
                      {cust.id}
                    </td>
                    <td className="p-4 font-medium">{cust.name}</td>
                    <td className="p-4 text-sm text-gray-600">{cust.email}</td>
                    <td className="p-4 text-sm text-gray-600">{cust.phone}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
                          cust.loyalty === "Gold"
                            ? "bg-amber-100 text-amber-600 border-amber-200"
                            : cust.loyalty === "Silver"
                              ? "bg-slate-100 text-slate-600 border-slate-200"
                              : "bg-orange-100 text-orange-600 border-orange-200"
                        }`}
                      >
                        {cust.loyalty}
                      </span>
                    </td>
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
