import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import PageHeader from "../components/PageHeader"
import Button from "./Components/Button"
import Badge from "./Components/Badge"
import Table from "./Components/Table"

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        axios
            .get(`https://dummyjson.com/products/${id}`)
            .then((response) => {
                setProduct(response.data)
            })
            .catch((err) => {
                setError(err.message)
            })
    }, [id])

    if (error) return (
        <div className="p-6">
            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
                Error: {error}
            </div>
        </div>
    )
    
    if (!product) return (
        <div className="flex justify-center items-center h-64 text-hijau font-bold">
            <div className="animate-bounce">Loading...</div>
        </div>
    )

    const priceInIDR = product.price * 15000

    const getCategoryBadgeType = (category) => {
        if (category === "makeup") return "success";
        if (category === "skincare") return "info";
        return "primary";
    };

    // Data untuk tabel detail produk
    const detailHeaders = ["Property", "Value"];
    const detailData = [
        { property: "Product Name", value: product.title },
        { property: "Category", value: product.category },
        { property: "Brand", value: product.brand },
        { property: "Stock", value: `${product.stock} unit` },
        { property: "Price (USD)", value: `$${product.price}` },
        { property: "Price (IDR)", value: `Rp ${priceInIDR.toLocaleString('id-ID')}` },
        { property: "Rating", value: product.rating || "N/A" },
        { property: "Description", value: product.description || "No description available" },
    ];

    return (
        <div id="product-detail-page">
            <PageHeader title="Product Detail" breadcrumb={["Dashboard", "Product List", product.title]}>
                <Button type="secondary" onClick={() => navigate("/products")}>
                    Back to List
                </Button>
            </PageHeader>

            <div className="p-5 flex justify-center">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden max-w-2xl w-full">
                    <div className="p-4">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="rounded-2xl w-full h-64 object-contain bg-slate-50 border border-gray-50 shadow-inner"
                        />
                    </div>

                    <div className="p-8 pt-2">
                        <h2 className="text-3xl font-extrabold text-slate-800 mb-4 text-center tracking-tight">
                            {product.title}
                        </h2>
                        
                        {/* Menggunakan komponen Table untuk menampilkan detail produk */}
                        <Table headers={detailHeaders}>
                            {detailData.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-3 font-medium text-gray-700 border">
                                        {item.property}
                                    </td>
                                    <td className="p-3 text-gray-600 border">
                                        {item.property === "Category" ? (
                                            <Badge type={getCategoryBadgeType(item.value)}>
                                                {item.value}
                                            </Badge>
                                        ) : (
                                            item.value
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}