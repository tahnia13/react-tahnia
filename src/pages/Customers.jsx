import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Table from "./Components/Table";
import Badge from "./Components/Badge";
import Button from "./Components/Button";
import InputField from "./Components/InputField";
import Alert from "./Components/Alert";
import Modal from "./Components/Modal";
import Loading from "../components/Loading";
import { useCustomers } from "../hooks/useCustomers";
import { customerService } from "../services/customerService";

export default function Customers() {
  const navigate = useNavigate();
  const { customers: fetchedCustomers, loading, error, refetch } = useCustomers();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const headers = ["Customer ID", "Name", "Email", "Phone", "Tier", "Points", "Action"];

  const getBadgeType = (tier) => {
    if (tier === "Gold") return "success";
    if (tier === "Silver") return "secondary";
    if (tier === "Platinum") return "info";
    return "warning";
  };

  // Filter customers
  const filteredCustomers = (fetchedCustomers || []).filter(cust =>
    cust.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cust.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cust.phone?.includes(searchTerm)
  );

  const handleViewDetail = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const result = await customerService.delete(selectedCustomer.id);

      if (result.error) {
        setAlertMessage("Failed to delete customer");
        setShowAlert(true);
        setIsDeleting(false);
        return;
      }

      setAlertMessage("Customer deleted successfully!");
      setShowAlert(true);
      setIsModalOpen(false);
      refetch();
      
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      console.error("Delete error:", err);
      setAlertMessage("Error deleting customer");
      setShowAlert(true);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div id="customers-page">
      <PageHeader title="Customers" breadcrumb={["Dashboard", "Customer List"]}>
        <Button type="primary" onClick={() => navigate("/add-customers")}>
          + Add New Customer
        </Button>
      </PageHeader>

      <div className="p-5">
        {error && (
          <div className="mb-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
            Error loading customers: {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-50">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Customers</h2>
                <p className="text-gray-400 text-sm">Manage all registered members</p>
              </div>
              <div className="w-64">
                <InputField 
                  label="" 
                  name="search" 
                  placeholder="Search by name, email or phone..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {showAlert && (
              <Alert type={alertMessage.includes("success") ? "success" : "error"} message={alertMessage} onClose={() => setShowAlert(false)} />
            )}
          </div>

          <Table headers={headers}>
            {filteredCustomers && filteredCustomers.length > 0 ? (
              filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-50 transition-colors">
                  <td className="border px-4 py-3 text-hijau font-mono font-bold text-sm">
                    {cust.id?.substring(0, 8)}
                  </td>
                  <td className="border px-4 py-3 font-medium">
                    {cust.full_name || "Unknown"}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-600">
                    {cust.email}
                  </td>
                  <td className="border px-4 py-3 text-sm text-gray-600">
                    {cust.phone || "N/A"}
                  </td>
                  <td className="border px-4 py-3">
                    <Badge type={getBadgeType(cust.tier)}>
                      {cust.tier || "Bronze"}
                    </Badge>
                  </td>
                  <td className="border px-4 py-3 font-semibold text-green-600">
                    {cust.points_balance || 0}
                  </td>
                  <td className="border px-4 py-3">
                    <div className="flex gap-2">
                      <Button type="primary" size="sm" onClick={() => handleViewDetail(cust)}>
                        Detail
                      </Button>
                      <Button type="danger" size="sm" onClick={() => handleViewDetail(cust)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="border px-4 py-8 text-center text-gray-500">
                  {searchTerm ? "No customers found" : "No customers yet"}
                </td>
              </tr>
            )}
          </Table>
        </div>
      </div>

      {/* Customer Detail Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Customer Details">
        {selectedCustomer && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-bold">{selectedCustomer.full_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-bold text-sm">{selectedCustomer.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-4 border-b">
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-bold">{selectedCustomer.phone || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Joined Date</p>
                <p className="font-bold">
                  {new Date(selectedCustomer.created_at).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-4 border-b">
              <div>
                <p className="text-sm text-gray-600">Current Tier</p>
                <p className="font-bold text-lg">
                  <Badge type={getBadgeType(selectedCustomer.tier)}>
                    {selectedCustomer.tier}
                  </Badge>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Points Balance</p>
                <p className="font-bold text-lg text-green-600">
                  {selectedCustomer.points_balance}
                </p>
              </div>
            </div>

            {selectedCustomer.address && (
              <div className="pb-4 border-b">
                <p className="text-sm text-gray-600 mb-1">Address</p>
                <p className="text-sm">{selectedCustomer.address}</p>
              </div>
            )}

            <div className="flex gap-2 justify-end pt-4">
              <Button 
                type="danger" 
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Customer"}
              </Button>
              <Button type="secondary" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
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