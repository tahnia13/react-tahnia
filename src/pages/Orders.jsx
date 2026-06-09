import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Table from "./Components/Table";
import Badge from "./Components/Badge";
import Button from "./Components/Button";
import InputField from "./Components/InputField";
import SelectField from "./Components/SelectField";
import Alert from "./Components/Alert";
import Modal from "./Components/Modal";

export default function Orders() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = Array.from({ length: 30 }, (_, i) => ({
    id: `ORD-99${i + 1}`,
    customer: ["Ahmad", "Siti", "Budi", "Dewi", "Eko"][i % 5],
    status: ["Pending", "Completed", "Cancelled"][i % 3],
    price: 50000 + ((i * 98765) % 500000),
    date: "2026-04-23",
  }));

  const headers = ["Order ID", "Customer Name", "Status", "Total Price", "Order Date", "Action"];

  const getBadgeType = (status) => {
    if (status === "Completed") return "success";
    if (status === "Cancelled") return "danger";
    return "warning";
  };

  const statusOptions = [
    { value: "", label: "Semua Status" },
    { value: "Pending", label: "Pending" },
    { value: "Completed", label: "Completed" },
    { value: "Cancelled", label: "Cancelled" }
  ];

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "" || order.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    setIsModalOpen(false);
  };

  return (
    <div id="orders-page">
      <PageHeader title="Orders" breadcrumb={["Dashboard", "Order List"]}>
        <Button type="primary" onClick={() => navigate("/add-orders")}>
          + Add New Order
        </Button>
      </PageHeader>

      <div className="p-5">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-50">
            <div className="flex flex-wrap gap-4 items-end mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Orders</h2>
                <p className="text-gray-400 text-sm">Ini Halaman Orders</p>
              </div>
              <div className="flex-1 max-w-xs">
                <InputField 
                  label="Cari Customer" 
                  name="search" 
                  placeholder="Cari nama customer..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-48">
                <SelectField 
                  label="Filter Status" 
                  name="status" 
                  options={statusOptions} 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                />
              </div>
            </div>
            
            {/* Alert Feedback */}
            {showAlert && (
              <Alert type="success" message="Status order berhasil diupdate!" onClose={() => setShowAlert(false)} />
            )}
          </div>

          <Table headers={headers}>
            {filteredOrders.map((ord) => (
              <tr key={ord.id} className="hover:bg-gray-50 transition-colors">
                <td className="border px-4 py-3 text-sky-600 font-mono font-bold">{ord.id}</td>
                <td className="border px-4 py-3 font-medium">{ord.customer}</td>
                <td className="border px-4 py-3">
                  <Badge type={getBadgeType(ord.status)}>{ord.status}</Badge>
                </td>
                <td className="border px-4 py-3 font-bold">Rp {ord.price.toLocaleString("id-ID")}</td>
                <td className="border px-4 py-3 text-gray-500 text-sm">{ord.date}</td>
                <td className="border px-4 py-3">
                  <Button type="primary" size="sm" onClick={() => handleViewDetail(ord)}>Detail</Button>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>

      {/* Modal Feedback untuk Detail Order */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Detail Order">
        {selectedOrder && (
          <div className="space-y-3">
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p><strong>Status:</strong> <Badge type={getBadgeType(selectedOrder.status)}>{selectedOrder.status}</Badge></p>
            <p><strong>Total Price:</strong> Rp {selectedOrder.price.toLocaleString("id-ID")}</p>
            <p><strong>Order Date:</strong> {selectedOrder.date}</p>
            <div className="flex gap-2 mt-4">
              <Button type="success" onClick={handleUpdateStatus}>Update Status</Button>
              <Button type="secondary" onClick={() => setIsModalOpen(false)}>Tutup</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}