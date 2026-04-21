import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import QuickActionCard from "../components/QuickActionCard";

export default function Dashboard() {
    return (
        <div id="dashboard-container">
            <PageHeader />

            <div id="dashboard-grid" className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div id="dashboard-orders" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="orders-icon" className="bg-hijau rounded-full p-4 text-3xl text-white">
                        <FaShoppingCart />
                    </div>
                    <div id="orders-info" className="flex flex-col">
                        <span id="orders-count" className="text-2xl font-bold">75</span>
                        <span id="orders-text" className="text-gray-400">Total Orders</span>
                    </div>
                </div>

                <div id="dashboard-delivered" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="delivered-icon" className="bg-blue-500 rounded-full p-4 text-3xl text-white">
                        <FaTruck />
                    </div>
                    <div id="delivered-info" className="flex flex-col">
                        <span id="delivered-count" className="text-2xl font-bold">175</span>
                        <span id="delivered-text" className="text-gray-400">Total Delivered</span>
                    </div>
                </div>

                <div id="dashboard-canceled" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="canceled-icon" className="bg-red-500 rounded-full p-4 text-3xl text-white">
                        <FaBan />
                    </div>
                    <div id="canceled-info" className="flex flex-col">
                        <span id="canceled-count" className="text-2xl font-bold">40</span>
                        <span id="canceled-text" className="text-gray-400">Total Canceled</span>
                    </div>
                </div>

                <div id="dashboard-revenue" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="revenue-icon" className="bg-yellow-400 rounded-full p-4 text-3xl text-white">
                        <FaDollarSign />
                    </div>
                    <div id="revenue-info" className="flex flex-col">
                        <span id="revenue-amount" className="text-2xl font-bold">Rp.128</span>
                        <span id="revenue-text" className="text-gray-400">Total Revenue</span>
                    </div>
                </div>
            </div>

            <div className="p-5 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
                <div className="rounded-3xl bg-white p-5 shadow-md">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold">Recent Activity</h3>
                            <p className="text-sm text-slate-500">Lihat aktivitas terkini dalam pengiriman dan order.</p>
                        </div>
                        <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Realtime</span>
                    </div>
                    <ul className="space-y-3 text-sm text-slate-600">
                        <li className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                            <span>Order #5017 confirmed</span>
                            <span className="text-xs font-semibold text-sky-600">Now</span>
                        </li>
                        <li className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                            <span>Driver on the way to warehouse</span>
                            <span className="text-xs font-semibold text-emerald-600">5m ago</span>
                        </li>
                        <li className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                            <span>Customer feedback received</span>
                            <span className="text-xs font-semibold text-slate-400">10m ago</span>
                        </li>
                    </ul>
                </div>

                <QuickActionCard
                    title="Optimize delivery route"
                    description="Gunakan analisis rute terbaru untuk mempercepat pengiriman dan mengurangi biaya."
                    buttonText="Lihat Rute"
                />
            </div>
        </div>
    );
}

