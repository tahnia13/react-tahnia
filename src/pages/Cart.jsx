import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import PageHeader from "../components/PageHeader";
import Button from "./Components/Button";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeItem, updateQuantity, clearCart, getTotalAmount } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }
    navigate("/checkout");
  };

  const handleRemoveItem = (productId) => {
    removeItem(productId);
  };

  return (
    <div id="cart-page">
      <PageHeader title="Shopping Cart" breadcrumb={["Dashboard", "Cart"]} />

      <div className="p-5">
        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <Button 
              type="primary" 
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-50">
                  <h2 className="text-xl font-bold text-slate-800">
                    Shopping Cart ({cart.length} items)
                  </h2>
                </div>

                <div className="divide-y">
                  {cart.map((item) => (
                    <div key={item.id} className="p-6 flex gap-4 hover:bg-gray-50">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        {item.image_url ? (
                          <img 
                            src={item.image_url} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">
                            📦
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Rp {(item.price * 1000).toLocaleString()} per item
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                          >
                            +
                          </button>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="ml-auto text-red-600 text-sm hover:text-red-700 font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                        <p className="font-bold text-lg text-gray-800">
                          Rp {(item.price * 1000 * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-gray-50 flex justify-between items-center">
                  <Button 
                    type="secondary"
                    onClick={() => navigate("/products")}
                  >
                    Continue Shopping
                  </Button>
                  <Button 
                    type="secondary"
                    onClick={clearCart}
                    className="text-red-600 hover:bg-red-50"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>

            {/* Cart Summary */}
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

                  <Button 
                    type="primary"
                    onClick={handleCheckout}
                    className="w-full"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
