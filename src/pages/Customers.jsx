import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Table from "./Components/Table";
import Badge from "./Components/Badge";
import Button from "./Components/Button";
import InputField from "./Components/InputField";
import Alert from "./Components/Alert";
import Modal from "./Components/Modal";

export default function Customers() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customers = Array.from({ length: 30 }, (_, i) => ({
    id: `CUST-${1000 + i}`,
    name: ["Andi Pratama", "Siti Aminah", "Budi Santoso", "Rina Wijaya", "Dewi Lestari"][i % 5] + ` ${i + 1}`,
    email: `user${i + 1}@sedap-resto.com`,
    phone: `0812-3456-78${i.toString().padStart(2, "0")}`,
    loyalty: ["Bronze", "Silver", "Gold"][i % 3],
  }));

  const headers = ["Customer ID", "Customer Name", "Email", "Phone", "Loyalty", "Action"];

  const getBadgeType = (loyalty) => {
    if (loyalty === "Gold") return "success";
    if (loyalty === "Silver") return "secondary";
    return "warning";
  };

  // Filter customers berdasarkan search
  const filteredCustomers = customers.filter(cust =>
    cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cust.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetail = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div id="customers-page">
      <PageHeader title="Customers" breadcrumb={["Dashboard", "Customer List"]}>
        <Button type="primary" onClick={() => navigate("/add-customers")}>
          + Add New Customer
        </Button>
      </PageHeader>

      <div className="p-5">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-50">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Customers</h2>
                <p className="text-gray-400 text-sm">Ini Halaman Customers</p>
              </div>
              <div className="w-64">
                <InputField 
                  label="" 
                  name="search" 
                  placeholder="Cari customer..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Alert Feedback */}
            {showAlert && (
              <Alert type="success" message="Customer berhasil dihapus!" onClose={() => setShowAlert(false)} />
            )}
          </div>

          <Table headers={headers}>
            {filteredCustomers.map((cust) => (
              <tr key={cust.id} className="hover:bg-gray-50 transition-colors">
                <td className="border px-4 py-3 text-hijau font-mono font-bold">{cust.id}</td>
                <td className="border px-4 py-3 font-medium">{cust.name}</td>
                <td className="border px-4 py-3 text-sm text-gray-600">{cust.email}</td>
                <td className="border px-4 py-3 text-sm text-gray-600">{cust.phone}</td>
                <td className="border px-4 py-3">
                  <Badge type={getBadgeType(cust.loyalty)}>{cust.loyalty}</Badge>
                </td>
                <td className="border px-4 py-3">
                  <div className="flex gap-2">
                    <Button type="primary" size="sm" onClick={() => handleViewDetail(cust)}>Detail</Button>
                    <Button type="danger" size="sm" onClick={handleDelete}>Hapus</Button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>

      {/* Modal Feedback */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Detail Customer">
        {selectedCustomer && (
          <div className="space-y-2">
            <p><strong>ID:</strong> {selectedCustomer.id}</p>
            <p><strong>Nama:</strong> {selectedCustomer.name}</p>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <p><strong>Telepon:</strong> {selectedCustomer.phone}</p>
            <p><strong>Loyalty:</strong> {selectedCustomer.loyalty}</p>
            <Button type="primary" onClick={() => setIsModalOpen(false)} className="mt-4 w-full">Tutup</Button>
          </div>
        )}
      </Modal>
    </div>
  );
}