import { 
  FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaUsers, FaBox, 
  FaChartLine, FaArrowUp, FaArrowDown, FaGift, FaStar, FaPlus 
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import QuickActionCard from "../components/QuickActionCard";
import HeroSection from "./Components/HeroSection";
import FeatureSection from "./Components/FeatureSection";
import ProductSection from "./Components/ProductSection";
import Loading from "../components/Loading";
import { useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useOrders } from "../hooks/useOrders";
import { useCustomers } from "../hooks/useCustomers";
import { useProducts } from "../hooks/useProducts";

export default function Dashboard() {
    const { profile, user } = useAuth();
    const isAdmin = profile?.role === "admin";
    const isMember = profile?.role === "member";
    
    // Fetch data based on role
    const { orders: adminOrders, loading: ordersLoading } = useOrders();
    const { customers: allCustomers, loading: customersLoading } = useCustomers();
    const { products: allProducts, loading: productsLoading } = useProducts();
    
    const isLoading = ordersLoading || customersLoading || productsLoading;

    // Calculate admin stats
    const adminStats = useMemo(() => {
        if (!adminOrders) return null;
        
        const totalOrders = adminOrders.length;
        const completed = adminOrders.filter(o => o.status === "completed").length;
        const pending = adminOrders.filter(o => o.status === "pending").length;
        const cancelled = adminOrders.filter(o => o.status === "cancelled").length;
        const totalRevenue = adminOrders
            .filter(o => o.status === "completed")
            .reduce((sum, o) => sum + (o.total_amount || 0), 0);
        
        const totalCustomers = allCustomers?.length || 0;
        const totalProducts = allProducts?.length || 0;
        const lowStock = allProducts?.filter(p => (p.stock || 0) < 10).length || 0;
        
        return {
            totalOrders,
            completed,
            pending,
            cancelled,
            totalRevenue,
            totalCustomers,
            totalProducts,
            lowStock
        };
    }, [adminOrders, allCustomers, allProducts]);

    // Calculate member stats
    const memberStats = useMemo(() => {
        if (!profile) return null;
        
        return {
            tier: profile.tier || "Bronze",
            points: profile.points_balance || 0,
            totalOrders: adminOrders?.filter(o => o.user_id === user?.id).length || 0,
            totalSpent: adminOrders
                ?.filter(o => o.user_id === user?.id && o.status === "completed")
                .reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0
        };
    }, [profile, user, adminOrders]);

    // Features data
    const features = [
        { icon: "📦", title: "Fast Delivery", description: "Fast shipping to all Indonesia" },
        { icon: "🔒", title: "Secure Payment", description: "Safe and guaranteed payment" },
        { icon: "💎", title: "Premium Quality", description: "Premium quality products" },
        { icon: "🔄", title: "Easy Returns", description: "Money back guarantee" }
    ];

    if (isLoading && isAdmin) return <Loading />;

    // ADMIN DASHBOARD
    if (isAdmin && adminStats) {
        return (
            <div id="dashboard-container" className="min-h-screen bg-gray-50">
                <PageHeader title="Admin Dashboard" breadcrumb={["Home"]} />

                {/* Hero Section */}
                <div className="px-5 mb-5">
                    <HeroSection 
                        title="Welcome to Sedap Admin"
                        subtitle="Manage products, orders, and customers efficiently"
                        buttonText="View Orders"
                        onButtonClick={() => window.location.href = "/orders"}
                    />
                </div>

                {/* Feature Section */}
                <div className="px-5 mb-5">
                    <FeatureSection features={features} />
                </div>

                {/* Stats Cards */}
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* Total Orders */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start">
                            <div className="bg-emerald-100 rounded-xl p-3">
                                <FaShoppingCart className="text-emerald-600 text-xl" />
                            </div>
                            <span className="text-xs text-gray-500">All</span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-bold text-slate-800">{adminStats.totalOrders}</h3>
                            <p className="text-sm text-gray-400 mt-1">Total Orders</p>
                        </div>
                    </div>

                    {/* Completed Orders */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start">
                            <div className="bg-green-100 rounded-xl p-3">
                                <FaTruck className="text-green-600 text-xl" />
                            </div>
                            <span className="text-xs text-green-600">+{Math.round(adminStats.completed/adminStats.totalOrders * 100)}%</span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-bold text-slate-800">{adminStats.completed}</h3>
                            <p className="text-sm text-gray-400 mt-1">Completed Orders</p>
                        </div>
                    </div>

                    {/* Total Revenue */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start">
                            <div className="bg-blue-100 rounded-xl p-3">
                                <FaDollarSign className="text-blue-600 text-xl" />
                            </div>
                            <span className="text-xs text-gray-500">Completed</span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-bold text-slate-800">Rp {(adminStats.totalRevenue * 1000).toLocaleString('id-ID')}</h3>
                            <p className="text-sm text-gray-400 mt-1">Total Revenue</p>
                        </div>
                    </div>

                    {/* Total Customers */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start">
                            <div className="bg-purple-100 rounded-xl p-3">
                                <FaUsers className="text-purple-600 text-xl" />
                            </div>
                            <span className="text-xs text-gray-500">Members</span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-bold text-slate-800">{adminStats.totalCustomers}</h3>
                            <p className="text-sm text-gray-400 mt-1">Total Customers</p>
                        </div>
                    </div>

                    {/* Total Products */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start">
                            <div className="bg-orange-100 rounded-xl p-3">
                                <FaBox className="text-orange-600 text-xl" />
                            </div>
                            <span className="text-xs text-gray-500">Active</span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-bold text-slate-800">{adminStats.totalProducts}</h3>
                            <p className="text-sm text-gray-400 mt-1">Total Products</p>
                        </div>
                    </div>

                    {/* Low Stock Products */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start">
                            <div className="bg-red-100 rounded-xl p-3">
                                <FaArrowDown className="text-red-600 text-xl" />
                            </div>
                            <span className="text-xs text-red-600">Alert</span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-bold text-slate-800">{adminStats.lowStock}</h3>
                            <p className="text-sm text-gray-400 mt-1">Low Stock Products</p>
                        </div>
                    </div>

                    {/* Pending Orders */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start">
                            <div className="bg-yellow-100 rounded-xl p-3">
                                <FaChartLine className="text-yellow-600 text-xl" />
                            </div>
                            <span className="text-xs text-yellow-600">{Math.round(adminStats.pending/adminStats.totalOrders * 100)}%</span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-bold text-slate-800">{adminStats.pending}</h3>
                            <p className="text-sm text-gray-400 mt-1">Pending Orders</p>
                        </div>
                    </div>

                    {/* Cancelled Orders */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start">
                            <div className="bg-red-100 rounded-xl p-3">
                                <FaBan className="text-red-600 text-xl" />
                            </div>
                            <span className="text-xs text-red-600">{adminStats.cancelled}</span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-bold text-slate-800">{adminStats.cancelled}</h3>
                            <p className="text-sm text-gray-400 mt-1">Cancelled Orders</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <QuickActionCard 
                        icon={FaPlus} 
                        title="Add New Order"
                        description="Create a new order"
                        onClick={() => window.location.href = "/add-orders"}
                        color="bg-emerald-500"
                    />
                    <QuickActionCard 
                        icon={FaBox} 
                        title="Add New Product"
                        description="Add product to inventory"
                        onClick={() => window.location.href = "/add-products"}
                        color="bg-blue-500"
                    />
                    <QuickActionCard 
                        icon={FaUsers} 
                        title="Add New Customer"
                        description="Register new member"
                        onClick={() => window.location.href = "/add-customers"}
                        color="bg-purple-500"
                    />
                    <QuickActionCard 
                        icon={FaShoppingCart} 
                        title="View All Orders"
                        description="See all orders"
                        onClick={() => window.location.href = "/orders"}
                        color="bg-orange-500"
                    />
                </div>
            </div>
        );
    }

    // MEMBER DASHBOARD
    if (isMember && memberStats) {
        return (
            <div id="member-dashboard" className="min-h-screen bg-gray-50 p-5">
                <PageHeader title="Member Dashboard" breadcrumb={["Home"]} />

                {/* Tier & Points Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
                    {/* Tier Badge */}
                    <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-sm opacity-90">Your Current Tier</p>
                                <h2 className="text-4xl font-bold mt-1">{memberStats.tier}</h2>
                            </div>
                            <FaStar className="text-5xl opacity-50" />
                        </div>
                        <p className="text-sm opacity-75">Upgrade your tier by spending more</p>
                    </div>

                    {/* Points Card */}
                    <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-sm opacity-90">Available Points</p>
                                <h2 className="text-4xl font-bold mt-1">{memberStats.points}</h2>
                            </div>
                            <FaGift className="text-5xl opacity-50" />
                        </div>
                        <p className="text-sm opacity-75">Use points for discounts</p>
                    </div>

                    {/* Spending Card */}
                    <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-sm opacity-90">Total Spent</p>
                                <h2 className="text-3xl font-bold mt-1">Rp {(memberStats.totalSpent * 1000).toLocaleString('id-ID')}</h2>
                            </div>
                            <FaDollarSign className="text-5xl opacity-50" />
                        </div>
                        <p className="text-sm opacity-75">Based on completed orders</p>
                    </div>
                </div>

                {/* Recent Orders Summary */}
                <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Your Orders</h3>
                        <a href="/orders" className="text-hijau font-semibold text-sm">View All →</a>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-gray-600 text-sm">Total Orders</p>
                            <p className="text-2xl font-bold text-blue-600 mt-1">{memberStats.totalOrders}</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <p className="text-gray-600 text-sm">Total Completed</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">
                                {adminOrders?.filter(o => o.user_id === user?.id && o.status === "completed").length || 0}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <QuickActionCard 
                        icon={FaBox} 
                        title="Browse Products"
                        description="Shop new items"
                        onClick={() => window.location.href = "/products"}
                        color="bg-blue-500"
                    />
                    <QuickActionCard 
                        icon={FaShoppingCart} 
                        title="View My Cart"
                        description="Check cart items"
                        onClick={() => window.location.href = "/cart"}
                        color="bg-emerald-500"
                    />
                </div>
            </div>
        );
    }

    return <Loading />;
}