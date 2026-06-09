import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaUsers, FaBox, FaChartLine, FaArrowUp, FaArrowDown } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import QuickActionCard from "../components/QuickActionCard";
import HeroSection from "./Components/HeroSection";
import FeatureSection from "./Components/FeatureSection";
import ProductSection from "./Components/ProductSection";
import { useMemo } from "react";
import productsData from "../data/products.json";

export default function Dashboard() {
    const stats = useMemo(() => {
        const orders = Array.from({ length: 30 }, (_, i) => ({
            status: ["Pending", "Completed", "Cancelled"][i % 3],
            price: 50000 + ((i * 1234567) % 500000),
        }));

        const totalOrders = orders.length;
        const totalDelivered = orders.filter(o => o.status === "Completed").length;
        const totalCanceled = orders.filter(o => o.status === "Cancelled").length;
        const totalRevenue = orders
            .filter(o => o.status === "Completed")
            .reduce((sum, o) => sum + o.price, 0);

        const totalCustomers = 30;
        const totalProducts = productsData.length;
        const lowStockProducts = productsData.filter(p => p.stock < 10).length;

        return {
            totalOrders,
            totalDelivered,
            totalCanceled,
            totalRevenue,
            totalCustomers,
            totalProducts,
            lowStockProducts,
            revenueGrowth: 12.5,
            ordersGrowth: 8.3
        };
    }, []);

    // Data untuk FeatureSection
    const features = [
        { icon: "📦", title: "Fast Delivery", description: "Pengiriman cepat ke seluruh Indonesia" },
        { icon: "🔒", title: "Secure Payment", description: "Pembayaran aman dan terjamin" },
        { icon: "💎", title: "Premium Quality", description: "Produk berkualitas premium" },
        { icon: "🔄", title: "Easy Returns", description: "Garansi uang kembali" }
    ];

    // Data untuk ProductSection
    

    // Data status order
    const statusData = [
        { name: "Completed", value: stats.totalDelivered, color: "bg-green-500" },
        { name: "Pending", value: stats.totalOrders - stats.totalDelivered - stats.totalCanceled, color: "bg-yellow-500" },
        { name: "Cancelled", value: stats.totalCanceled, color: "bg-red-500" }
    ];

    const categoryData = [
        { name: "Makeup", value: productsData.filter(p => p.category === "makeup").length, color: "bg-pink-500" },
        { name: "Skincare", value: productsData.filter(p => p.category === "skincare").length, color: "bg-blue-500" }
    ];

    const totalProductsCount = categoryData.reduce((sum, c) => sum + c.value, 0);

    return (
        <div id="dashboard-container" className="min-h-screen bg-gray-50">
            <PageHeader title="Dashboard" breadcrumb={["Home"]} />

            {/* Hero Section di Dashboard */}
            <div className="px-5 mb-5">
                <HeroSection 
                    title="Selamat Datang di Sedap Admin"
                    subtitle="Kelola produk, pesanan, dan customer dengan mudah"
                    buttonText="Kelola Produk"
                    onButtonClick={() => window.location.href = "/products"}
                />
            </div>

            {/* Feature Section di Dashboard */}
            <div className="px-5 mb-5">
                <FeatureSection features={features} />
            </div>

            {/* Stats Cards */}
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Total Orders */}
                <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                        <div className="bg-emerald-100 rounded-xl p-3">
                            <FaShoppingCart className="text-emerald-600 text-xl" />
                        </div>
                        <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            <FaArrowUp className="text-xs" /> {stats.ordersGrowth}%
                        </span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-bold text-slate-800">{stats.totalOrders}</h3>
                        <p className="text-sm text-gray-400 mt-1">Total Orders</p>
                    </div>
                </div>

                {/* Total Revenue */}
                <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                        <div className="bg-blue-100 rounded-xl p-3">
                            <FaDollarSign className="text-blue-600 text-xl" />
                        </div>
                        <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            <FaArrowUp className="text-xs" /> {stats.revenueGrowth}%
                        </span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-bold text-slate-800">Rp {stats.totalRevenue.toLocaleString('id-ID')}</h3>
                        <p className="text-sm text-gray-400 mt-1">Total Revenue</p>
                    </div>
                </div>

                {/* Total Customers */}
                <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                        <div className="bg-purple-100 rounded-xl p-3">
                            <FaUsers className="text-purple-600 text-xl" />
                        </div>
                        <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            <FaArrowUp className="text-xs" /> 5.2%
                        </span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-bold text-slate-800">{stats.totalCustomers}</h3>
                        <p className="text-sm text-gray-400 mt-1">Total Customers</p>
                    </div>
                </div>

                {/* Total Products */}
                <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
                    <div className="flex justify-between items-start">
                        <div className="bg-orange-100 rounded-xl p-3">
                            <FaBox className="text-orange-600 text-xl" />
                        </div>
                        <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                            <FaArrowDown className="text-xs" /> {stats.lowStockProducts} low stock
                        </span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-bold text-slate-800">{stats.totalProducts}</h3>
                        <p className="text-sm text-gray-400 mt-1">Total Products</p>
                    </div>
                </div>
            </div>


            {/* Chart Section */}
            <div className="px-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Order Status Chart */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-800">Order Status</h3>
                        <FaChartLine className="text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {statusData.map((item, idx) => {
                            const percentage = stats.totalOrders > 0 ? (item.value / stats.totalOrders) * 100 : 0;
                            return (
                                <div key={idx}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">{item.name}</span>
                                        <span className="font-semibold">{item.value} ({percentage.toFixed(0)}%)</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className={`${item.color} h-2 rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Completion Rate</span>
                            <span className="font-bold text-green-600">
                                {stats.totalOrders > 0 ? ((stats.totalDelivered / stats.totalOrders) * 100).toFixed(0) : 0}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Product Categories Chart */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-800">Product Categories</h3>
                        <FaBox className="text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {categoryData.map((item, idx) => {
                            const percentage = (item.value / totalProductsCount) * 100;
                            return (
                                <div key={idx}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                            <span className="text-gray-600">{item.name}</span>
                                        </div>
                                        <span className="font-semibold">{item.value} ({percentage.toFixed(0)}%)</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className={`${item.color} h-2 rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Total Products</span>
                            <span className="font-bold text-slate-800">{totalProductsCount}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity dan Quick Action */}
            <div className="p-5 grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-5">
                {/* Recent Activity */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-800">Recent Activity</h3>
                        <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Today</span>
                    </div>
                    <div className="space-y-4">
                        {[
                            { text: "Order #5017 confirmed", time: "Now", color: "bg-sky-100 text-sky-600" },
                            { text: "Driver on the way to warehouse", time: "5m ago", color: "bg-emerald-100 text-emerald-600" },
                            { text: "Customer feedback received", time: "10m ago", color: "bg-slate-100 text-slate-600" },
                            { text: `Low stock alert: ${stats.lowStockProducts} products below 10 units`, time: "15m ago", color: "bg-yellow-100 text-yellow-600" }
                        ].map((activity, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <span className="text-sm text-gray-700">{activity.text}</span>
                                <span className={`text-xs font-medium px-2 py-1 rounded-lg ${activity.color}`}>{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Action + Summary */}
                <div className="space-y-5">
                    <QuickActionCard
                        title="Optimize delivery route"
                        description="Gunakan analisis rute terbaru untuk mempercepat pengiriman."
                        buttonText="Lihat Rute"
                    />
                    
                    <div className="bg-linear-to-r from-hijau to-emerald-600 rounded-2xl p-5 text-white">
                        <h4 className="font-semibold mb-2">Today's Summary</h4>
                        <div className="flex justify-between mt-3">
                            <div>
                                <p className="text-2xl font-bold">8</p>
                                <p className="text-xs opacity-80">New Orders</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">Rp 2.4M</p>
                                <p className="text-xs opacity-80">Revenue</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">3</p>
                                <p className="text-xs opacity-80">Completed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}