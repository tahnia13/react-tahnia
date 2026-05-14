import React from "react";
import { Link, useNavigate } from "react-router-dom";
import productsData from "../data/products.json";
import PageHeader from "../components/PageHeader";

export default function Produk() {
  const navigate = useNavigate();

  return (
    <div id="products-page">
      {/* Menggunakan PageHeader yang sama dengan Customers */}
      <PageHeader title="Products" breadcrumb={["Dashboard", "Product List"]}>
        <button
          onClick={() => navigate("/add-orders")} // Sesuaikan route jika ada form tambah produk
          className="bg-hijau text-white px-6 py-2 rounded-lg hover:bg-emerald-600 font-bold shadow-md transition-all active:scale-95"
        >
          + Add New Product
        </button>
      </PageHeader>

      <div className="p-5">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          {/* Header Card */}
          <div className="p-6 border-b border-gray-50">
            <h2 className="text-xl font-bold text-slate-800">Products</h2>
            <p className="text-gray-400 text-sm">Manajemen daftar produk restoran Anda</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                <tr>
                  <th className="p-4 font-bold">Product ID</th>
                  <th className="p-4 font-bold">Product Name</th>
                  <th className="p-4 font-bold">Category</th>
                  <th className="p-4 font-bold">Brand</th>
                  <th className="p-4 font-bold">Price</th>
                  <th className="p-4 font-bold">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {productsData.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* ID Produk dengan style font-mono hijau */}
                    <td className="p-4 text-hijau font-mono font-bold">
                      #{product.id.toString().padStart(4, "0")}
                    </td>

                    {/* Nama Produk sebagai Link ke Detail */}
                    <td className="p-4">
                      <Link
                        to={`/products/${product.id}`}
                        className="font-medium text-slate-700 hover:text-hijau transition-colors"
                      >
                        {product.title}
                      </Link>
                    </td>

                    {/* Kategori dengan label pill style */}
                    <td className="p-4">
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-blue-100">
                        {product.category}
                      </span>
                    </td>

                    <td className="p-4 text-sm text-gray-600">{product.brand}</td>

                    <td className="p-4 text-sm font-bold text-slate-800">
                      Rp {product.price.toLocaleString()}
                    </td>

                    {/* Badge Stock dengan warna kondisional */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
                          product.stock > 10
                            ? "bg-green-100 text-green-600 border-green-200"
                            : "bg-red-100 text-red-600 border-red-200"
                        }`}
                      >
                        {product.stock} Qty
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