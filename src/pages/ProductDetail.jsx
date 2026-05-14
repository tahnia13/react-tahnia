import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import PageHeader from "../components/PageHeader" // Pastikan import PageHeader

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

    return (
        <div id="product-detail-page">
            {/* Header dengan Breadcrumb sesuai gambar referensi */}
            <PageHeader title="Product Detail" breadcrumb={["Dashboard", "Product List", product.title]}>
                <button
                    onClick={() => navigate("/products")}
                    className="bg-white text-gray-600 border border-gray-200 px-6 py-2 rounded-lg hover:bg-gray-50 font-bold shadow-sm transition-all active:scale-95"
                >
                    Back to List
                </button>
            </PageHeader>

            <div className="p-5 flex justify-center">
                {/* Card Detail Produk sesuai desain Hasil Akhir */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden max-w-md w-full">
                    {/* Container Gambar dengan aspek rasio yang bagus */}
                    <div className="p-4">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="rounded-2xl w-full h-64 object-contain bg-slate-50 border border-gray-50 shadow-inner"
                        />
                    </div>

                    {/* Konten Detail */}
                    <div className="p-8 pt-2 text-center">
                        <h2 className="text-3xl font-extrabold text-slate-800 mb-4 tracking-tight">
                            {product.title}
                        </h2>
                        
                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400 font-medium">Kategori:</span>
                                <span className="text-hijau bg-green-50 px-3 py-1 rounded-full font-bold uppercase text-[10px]">
                                    {product.category}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400 font-medium">Brand:</span>
                                <span className="text-slate-700 font-bold">{product.brand}</span>
                            </div>
                        </div>

                        {/* Harga dengan style Sedap Restaurant */}
                        <div className="bg-slate-50 rounded-2xl p-4 border border-dashed border-gray-200">
                            <p className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">Total Price</p>
                            <p className="text-3xl font-black text-slate-900">
                                Rp {(product.price * 15000).toLocaleString('id-ID')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}