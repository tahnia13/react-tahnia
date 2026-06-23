import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Table from "./Components/Table";
import Badge from "./Components/Badge";
import Button from "./Components/Button";
import { useProducts } from "../hooks/useProducts";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import Loading from "../components/Loading";

export default function Produk() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { products, loading, error } = useProducts();
  const { addItem } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);

  const getCategoryBadgeType = (category) => {
    if (category === "makeup") return "success";
    if (category === "skincare") return "info";
    return "primary";
  };

  const isAdmin = profile?.role === "admin";
  const headers = isAdmin 
    ? ["PRODUCT ID", "PRODUCT NAME", "CATEGORY", "PRICE", "STOCK", "ACTION"]
    : ["PRODUCT ID", "PRODUCT NAME", "CATEGORY", "PRICE", "STOCK", "ACTION"];

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowAddToCartModal(true);
  };

  const confirmAddToCart = () => {
    if (selectedProduct && quantity > 0) {
      addItem(selectedProduct, quantity);
      setShowAddToCartModal(false);
      // Show toast-like feedback
      alert(`${selectedProduct.name} added to cart (${quantity}x)`);
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="p-5">
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
          Error loading products: {error}
        </div>
      </div>
    );
  }

  return (
    <div id="products-page">
      <PageHeader title="Products" breadcrumb={["Dashboard", "Product List"]}>
        {isAdmin && (
          <Button type="primary" onClick={() => navigate("/add-orders")}>
            + Add New Product
          </Button>
        )}
      </PageHeader>

      <div className="p-5">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-50">
            <h2 className="text-xl font-bold text-slate-800">Products</h2>
            <p className="text-gray-400 text-sm">
              {isAdmin 
                ? "Manajemen daftar produk makeup & skincare" 
                : `Katalog produk kami (${products.length} items)`
              }
            </p>
          </div>

          <Table headers={headers}>
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="border px-4 py-3 text-hijau font-mono font-bold text-sm">
                    {product.id?.substring(0, 8)}
                  </td>
                  <td className="border px-4 py-3">
                    <Link 
                      to={`/products/${product.id}`} 
                      className="font-medium text-slate-700 hover:text-hijau transition-colors"
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td className="border px-4 py-3">
                    <Badge type={getCategoryBadgeType(product.category || "makeup")}>
                      {product.category || "other"}
                    </Badge>
                  </td>
                  <td className="border px-4 py-3 text-sm font-bold text-slate-800">
                    Rp {(product.price * 1000).toLocaleString()}
                  </td>
                  <td className="border px-4 py-3">
                    <Badge type={product.stock > 10 ? "success" : product.stock > 0 ? "warning" : "danger"}>
                      {product.stock} Qty
                    </Badge>
                  </td>
                  <td className="border px-4 py-3">
                    {isAdmin ? (
                      <div className="flex gap-2">
                        <Button 
                          type="secondary" 
                          onClick={() => navigate(`/products/${product.id}`)}
                          className="text-xs py-1 px-2"
                        >
                          Edit
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        type="primary"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock <= 0}
                        className="text-xs py-1 px-3"
                      >
                        {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="border px-4 py-8 text-center text-gray-500">
                  No products available
                </td>
              </tr>
            )}
          </Table>
        </div>
      </div>

      {/* Add to Cart Modal */}
      {showAddToCartModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Add to Cart</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Product: {selectedProduct.name}</p>
              <p className="text-sm text-gray-600 mt-2">
                Price: Rp {(selectedProduct.price * 1000).toLocaleString()} per item
              </p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  −
                </button>
                <input 
                  type="number" 
                  min="1" 
                  max={selectedProduct.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(selectedProduct.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
                />
                <button 
                  onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
            <div className="mb-6 p-3 bg-gray-100 rounded">
              <p className="text-sm text-gray-600">Total: <span className="font-bold">Rp {(selectedProduct.price * 1000 * quantity).toLocaleString()}</span></p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowAddToCartModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={confirmAddToCart}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}