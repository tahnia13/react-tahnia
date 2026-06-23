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
import Loading from "../components/Loading";
import { useOrders, useUserOrders } from "../hooks/useOrders";
import { useAuth } from "../contexts/AuthContext";
import { orderService } from "../services/orderService";

export default function Orders() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const isAdmin = profile?.role === "admin";
  
  // Fetch orders based on role
  const adminOrders = useOrders();
  const userOrders = useUserOrders(isAdmin ? null : user?.id);
  const { orders: fetchedOrders, loading, error } = isAdmin ? adminOrders : userOrders;

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const headers = isAdmin
    ? ["Order ID", "Customer", "Status", "Total", "Date", "Action"]
    : ["Order ID", "Status", "Total", "Points", "Date", "Action"];

  const getBadgeType = (status) => {
    if (status === "completed") return "success";
    if (status === "cancelled") return "danger";
    if (status === "shipped") return "info";
    if (status === "processing") return "secondary";
    return "warning";
  };

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" }
  ];

  // Filter orders
  const filteredOrders = (fetchedOrders || []).filter(order => {
    const matchSearch = isAdmin 
      ? order.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
      : order.order_number?.includes(searchTerm.toUpperCase());
    const matchStatus = statusFilter === "" || order.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setSelectedStatus(order.status);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async () => {
    try {
      setUpdatingStatus(true);
      const result = await orderService.updateStatus(selectedOrder.id, selectedStatus);
      
      if (result.error) {
        setAlertMessage("Failed to update order status");
        setShowAlert(true);
        setUpdatingStatus(false);
        return;
      }

      setAlertMessage("Order status updated successfully!");
      setShowAlert(true);
      setIsModalOpen(false);
      
      // Refresh orders
      if (isAdmin) {
        adminOrders.refetch();
      } else {
        userOrders.refetch();
      }
      
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      console.error("Update status error:", err);
      setAlertMessage("Error updating order status");
      setShowAlert(true);
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div id="orders-page">
      <PageHeader title="Orders" breadcrumb={["Dashboard", "Order List"]}>
        {isAdmin && (
          <Button type="primary" onClick={() => navigate("/add-orders")}>
            + Add New Order
          </Button>
        )}
      </PageHeader>

      <div className="p-5">
        {error && (
          <div className="mb-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
            Error loading orders: {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-50">
            <div className="flex flex-wrap gap-4 items-end mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Orders</h2>
                <p className="text-gray-400 text-sm">
                  {isAdmin ? "Manage all customer orders" : "Your order history"}
                </p>
              </div>
              <div className="flex-1 max-w-xs">
                <InputField 
                  label={isAdmin ? "Search Customer" : "Search Order"}
                  name="search" 
                  placeholder={isAdmin ? "Search customer name..." : "Search order ID..."} 
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
            
            {showAlert && (
              <Alert type={alertMessage.includes("success") ? "success" : "error"} message={alertMessage} onClose={() => setShowAlert(false)} />
            )}
          </div>

          <Table headers={headers}>
            {filteredOrders && filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="border px-4 py-3 text-sky-600 font-mono font-bold text-sm">
                    {order.order_number}
                  </td>
                  
                  {isAdmin && (
                    <td className="border px-4 py-3 font-medium">
                      {order.profiles?.full_name || "Unknown"}
                    </td>
                  )}
                  
                  <td className="border px-4 py-3">
                    <Badge type={getBadgeType(order.status)}>
                      {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                    </Badge>
                  </td>
                  
                  <td className="border px-4 py-3 font-bold">
                    Rp {(order.total_amount * 1000).toLocaleString('id-ID')}
                  </td>

                  {!isAdmin && (
                    <td className="border px-4 py-3 text-green-600 font-semibold">
                      {order.points_earned || 0}
                    </td>
                  )}
                  
                  <td className="border px-4 py-3 text-gray-500 text-sm">
                    {new Date(order.created_at).toLocaleDateString('id-ID')}
                  </td>
                  
                  <td className="border px-4 py-3">
                    <Button type="primary" size="sm" onClick={() => handleViewDetail(order)}>
                      Detail
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="border px-4 py-8 text-center text-gray-500">
                  {searchTerm || statusFilter ? "No orders found" : "No orders yet"}
                </td>
              </tr>
            )}
          </Table>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Order Details">
        {selectedOrder && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b">
              <div>
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-bold text-lg">{selectedOrder.order_number}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-bold">{new Date(selectedOrder.created_at).toLocaleDateString('id-ID')}</p>
              </div>
            </div>

            {isAdmin && selectedOrder.profiles && (
              <div className="pb-4 border-b">
                <p className="text-sm text-gray-600 mb-2">Customer Information</p>
                <p><strong>Name:</strong> {selectedOrder.profiles.full_name}</p>
                <p><strong>Email:</strong> {selectedOrder.profiles.email}</p>
                <p><strong>Phone:</strong> {selectedOrder.profiles.phone || "N/A"}</p>
              </div>
            )}

            <div className="pb-4 border-b">
              <p className="text-sm text-gray-600 mb-2">Shipping Address</p>
              <p className="font-medium text-sm">{selectedOrder.shipping_address}</p>
            </div>

            {selectedOrder.order_items && (
              <div className="pb-4 border-b">
                <p className="text-sm text-gray-600 mb-2">Order Items</p>
                <div className="space-y-2">
                  {selectedOrder.order_items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.products?.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        Rp {(item.subtotal * 1000).toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pb-4 border-b">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-lg font-bold text-green-600">
                  Rp {(selectedOrder.total_amount * 1000).toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            {isAdmin && (
              <div className="pb-4 border-b">
                <p className="text-sm text-gray-600 mb-2">Update Status</p>
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-hijau"
                >
                  {statusOptions.filter(opt => opt.value).map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            )}

            {selectedOrder.notes && (
              <div className="pb-4 border-b">
                <p className="text-sm text-gray-600 mb-1">Notes</p>
                <p className="text-sm text-gray-700">{selectedOrder.notes}</p>
              </div>
            )}

            <div className="flex gap-2 justify-end">
              {isAdmin && selectedStatus !== selectedOrder.status && (
                <Button 
                  type="success" 
                  onClick={handleUpdateStatus}
                  disabled={updatingStatus}
                >
                  {updatingStatus ? "Updating..." : "Update Status"}
                </Button>
              )}
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