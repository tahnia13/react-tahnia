import React from "react";
import { Link, useNavigate } from "react-router-dom";
import productsData from "../data/products.json";
import PageHeader from "../components/PageHeader";
import Table from "./Components/Table";
import Badge from "./Components/Badge";
import Button from "./Components/Button";

export default function Produk() {
  const navigate = useNavigate();

  const getCategoryBadgeType = (category) => {
    if (category === "makeup") return "success";
    if (category === "skincare") return "info";
    return "primary";
  };

  const headers = ["PRODUCT ID", "PRODUCT NAME", "CATEGORY", "BRAND", "PRICE", "STOCK"];

  return (
    <div id="products-page">
      <PageHeader title="Products" breadcrumb={["Dashboard", "Product List"]}>
        <Button type="primary" onClick={() => navigate("/add-orders")}>
          + Add New Product
        </Button>
      </PageHeader>

      <div className="p-5">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-50">
            <h2 className="text-xl font-bold text-slate-800">Products</h2>
            <p className="text-gray-400 text-sm">Manajemen daftar produk makeup & skincare</p>
          </div>

          <Table headers={headers}>
            {productsData.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="border px-4 py-3 text-hijau font-mono font-bold">
                  {product.code}
                </td>
                <td className="border px-4 py-3">
                  <Link 
                    to={`/products/${product.id}`} 
                    className="font-medium text-slate-700 hover:text-hijau transition-colors"
                  >
                    {product.title}
                  </Link>
                </td>
                <td className="border px-4 py-3">
                  <Badge type={getCategoryBadgeType(product.category)}>
                    {product.category}
                  </Badge>
                </td>
                <td className="border px-4 py-3 text-sm text-gray-600">
                  {product.brand}
                </td>
                <td className="border px-4 py-3 text-sm font-bold text-slate-800">
                  Rp {(product.price * 15000).toLocaleString()}
                </td>
                <td className="border px-4 py-3">
                  <Badge type={product.stock > 10 ? "success" : "danger"}>
                    {product.stock} Qty
                  </Badge>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
}