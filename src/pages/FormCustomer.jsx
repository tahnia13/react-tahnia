import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import InputField from "./Components/InputField";
import TextArea from "./Components/TextArea";
import SelectField from "./Components/SelectField";
import Button from "./Components/Button";
import Alert from "./Components/Alert";

export default function FormCustomer() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    address: "",
    loyalty: "Bronze" 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loyaltyOptions = [
    { value: "Bronze", label: "Bronze" },
    { value: "Silver", label: "Silver" },
    { value: "Gold", label: "Gold" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      navigate("/customers");
    }, 2000);
  };

  return (
    <div id="form-customer-page" className="min-h-screen bg-gray-50">
      <PageHeader title="Add New Customer" breadcrumb={["Dashboard", "Customers", "Register"]} />

      <div className="p-10">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto border border-gray-100">
          <h2 className="text-2xl font-bold mb-8 text-slate-800">Registrasi Pelanggan</h2>

          {showAlert && <Alert type="success" message="Customer Berhasil Terdaftar!" onClose={() => setShowAlert(false)} />}

          <InputField label="Full Name" name="name" placeholder="Masukkan nama lengkap..." value={formData.name} onChange={handleChange} required />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Email Address" type="email" name="email" placeholder="email@contoh.com" value={formData.email} onChange={handleChange} required />
            <InputField label="Phone Number" type="tel" name="phone" placeholder="0812..." value={formData.phone} onChange={handleChange} required />
          </div>

          <TextArea label="Alamat" name="address" placeholder="Masukkan alamat lengkap..." value={formData.address} onChange={handleChange} rows={3} />

          <SelectField label="Loyalty Tier" name="loyalty" options={loyaltyOptions} value={formData.loyalty} onChange={handleChange} />

          <div className="mt-10 flex gap-4">
            <Button type="success" className="flex-1">Daftarkan Customer</Button>
            <Button type="secondary" onClick={() => navigate("/customers")} className="flex-1">Kembali</Button>
          </div>
        </form>
      </div>
    </div>
  );
}