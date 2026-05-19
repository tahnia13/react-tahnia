import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import InputField from "./Components/InputField";
import SelectField from "./Components/SelectField";
import Button from "./Components/Button";

export default function FormOrder() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ customer: "", status: "Pending", price: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Completed", label: "Completed" },
    { value: "Cancelled", label: "Cancelled" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order Berhasil Ditambahkan!");
    navigate("/orders");
  };

  return (
    <div id="form-order-page" className="min-h-screen bg-gray-50">
      <PageHeader title="Add New Order" breadcrumb={["Dashboard", "Orders", "Create"]} />

      <div className="p-10">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Detail Pesanan Baru</h2>
            <span className="text-hijau font-semibold">ID: ORD-AUTO</span>
          </div>

          <InputField label="Customer Name" name="customer" placeholder="Nama Pelanggan..." value={formData.customer} onChange={handleChange} required />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField label="Status Order" name="status" options={statusOptions} value={formData.status} onChange={handleChange} />
            <InputField label="Total Harga (Rp)" type="number" name="price" placeholder="0" value={formData.price} onChange={handleChange} required />
          </div>

          <div className="mt-10 flex gap-4">
            <Button type="success" className="flex-1">Simpan Order</Button>
            <Button type="secondary" onClick={() => navigate("/orders")} className="flex-1">Batal</Button>
          </div>
        </form>
      </div>
    </div>
  );
}