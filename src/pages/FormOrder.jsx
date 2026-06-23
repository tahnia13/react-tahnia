import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import InputField from "./Components/InputField";
import SelectField from "./Components/SelectField";
import Button from "./Components/Button";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { orderService } from "../services/orderService";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function FormOrder() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { cart, getTotalAmount, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    shipping_address: "",
    notes: "",
  });

  const isAdmin = profile?.role === "admin";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (!formData.shipping_address.trim()) {
        setError("Shipping address is required");
        setLoading(false);
        return;
      }

      if (cart.length === 0) {
        setError("Cart is empty. Please add products before checkout");
        setLoading(false);
        return;
      }

      // Prepare order data
      const orderData = {
        user_id: user.id,
        total_amount: getTotalAmount(),
        shipping_address: formData.shipping_address,
        notes: formData.notes,
      };

      // Prepare order items
      const orderItems = cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price_at_time: item.price,
      }));

      // Create order
      const result = await orderService.create(orderData, orderItems);

      if (result.error) {
        setError(result.error.message || "Failed to create order");
        setLoading(false);
        return;
      }

      // Clear cart after successful order
      clearCart();

      // Show success and redirect
      alert(`Order created successfully! Order #: ${result.data.order_number}`);
      navigate("/orders");
    } catch (err) {
      console.error("Order creation error:", err);
      setError(err.message || "An unexpected error occurred");
      setLoading(false);
    }
  };

  if (isAdmin) {
    // Admin view - Form to add order manually
    return (
      <div id="form-order-page" className="min-h-screen bg-gray-50">
        <PageHeader title="Add New Order" breadcrumb={["Dashboard", "Orders", "Create"]} />

        <div className="p-10">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800">Detail Pesanan Baru</h2>
              <span className="text-hijau font-semibold">ID: ORD-AUTO</span>
            </div>

            <InputField 
              label="Shipping Address" 
              name="shipping_address" 
              placeholder="Alamat pengiriman..." 
              value={formData.shipping_address} 
              onChange={handleChange} 
              required 
            />

            <InputField 
              label="Notes (Optional)" 
              name="notes" 
              placeholder="Catatan pesanan..." 
              value={formData.notes} 
              onChange={handleChange}
              as="textarea"
            />

            <div className="mt-10 flex gap-4">
              <Button type="success" className="flex-1" disabled={loading}>
                {loading ? "Creating..." : "Create Order"}
              </Button>
              <Button type="secondary" onClick={() => navigate("/orders")} className="flex-1" disabled={loading}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Member view - Checkout from cart
  return (
    <div id="checkout-page" className="min-h-screen bg-gray-50">
      <PageHeader title="Checkout" breadcrumb={["Dashboard", "Cart", "Checkout"]} />

      <div className="p-5">
        {error && (
          <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-1">Checkout</h2>
                  <p className="text-gray-600 text-sm">Complete your order</p>
                </div>

                {/* Shipping Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shipping Address *
                  </label>
                  <textarea
                    name="shipping_address"
                    value={formData.shipping_address}
                    onChange={handleChange}
                    placeholder="Enter your full shipping address..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:border-hijau focus:ring-1 focus:ring-hijau"
                    rows="4"
                    required
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Add any special instructions..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:border-hijau focus:ring-1 focus:ring-hijau"
                    rows="2"
                  />
                </div>

                {/* Order Items Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-3">Order Items</h3>
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          Rp {(item.price * 1000 * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <Button 
                    type="secondary" 
                    onClick={() => navigate("/cart")}
                    className="flex-1"
                    disabled={loading}
                  >
                    Back to Cart
                  </Button>
                  <Button 
                    type="primary" 
                    className="flex-1 flex items-center justify-center gap-2"
                    disabled={loading || cart.length === 0}
                  >
                    {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
                    {loading ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 sticky top-4">
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-4">Order Summary</h3>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">Rp {getTotalAmount().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">Rp 0</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-600">Rp {getTotalAmount().toLocaleString()}</span>
                </div>

                {profile?.role === "member" && (
                  <div className="bg-green-50 p-3 rounded-lg mb-4 text-sm">
                    <p className="text-gray-600">Poin Balance: <span className="font-bold text-green-600">{profile?.points_balance || 0}</span></p>
                    <p className="text-gray-600 mt-1">Current Tier: <span className="font-bold text-green-600">{profile?.tier || "Bronze"}</span></p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}