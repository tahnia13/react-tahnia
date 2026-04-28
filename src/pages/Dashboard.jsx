import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import QuickActionCard from "../components/QuickActionCard";

export default function Dashboard() {
  return (
    <div id="dashboard-container" className="min-h-screen bg-gray-50">
      <PageHeader />

      {/* Bagian Stats Card - Responsif Grid */}
      <div
        id="dashboard-grid"
        className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Total Orders */}
        <div className="flex items-center space-x-5 bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="bg-emerald-500 rounded-full p-4 text-2xl text-white flex-shrink-0">
            <FaShoppingCart />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-2xl font-bold text-slate-800 line-clamp-1">
              75
            </span>
            <span className="text-sm text-gray-400 whitespace-nowrap">
              Total Orders
            </span>
          </div>
        </div>

        {/* Total Delivered */}
        <div className="flex items-center space-x-5 bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="bg-blue-500 rounded-full p-4 text-2xl text-white flex-shrink-0">
            <FaTruck />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-2xl font-bold text-slate-800 line-clamp-1">
              175
            </span>
            <span className="text-sm text-gray-400 whitespace-nowrap">
              Total Delivered
            </span>
          </div>
        </div>

        {/* Total Canceled */}
        <div className="flex items-center space-x-5 bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="bg-red-500 rounded-full p-4 text-2xl text-white flex-shrink-0">
            <FaBan />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-2xl font-bold text-slate-800 line-clamp-1">
              40
            </span>
            <span className="text-sm text-gray-400 whitespace-nowrap">
              Total Canceled
            </span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="flex items-center space-x-5 bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="bg-yellow-400 rounded-full p-4 text-2xl text-white flex-shrink-0">
            <FaDollarSign />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-2xl font-bold text-slate-800 line-clamp-1">
              Rp.128
            </span>
            <span className="text-sm text-gray-400 whitespace-nowrap">
              Total Revenue
            </span>
          </div>
        </div>
      </div>

      {/* Bagian Bawah - Recent Activity & Action */}
      <div className="p-5 grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-6">
        {/* Activity List */}
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Recent Activity
              </h3>
              <p className="text-sm text-slate-500">
                Lihat aktivitas terkini dalam pengiriman dan order.
              </p>
            </div>
            <span className="hidden sm:block text-xs uppercase tracking-widest text-slate-400 font-medium">
              Realtime
            </span>
          </div>

          <ul className="space-y-4">
            <li className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 border border-transparent hover:border-sky-100 transition-colors">
              <span className="text-sm text-slate-600 font-medium">
                Order #5017 confirmed
              </span>
              <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded-lg">
                Now
              </span>
            </li>
            <li className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 border border-transparent hover:border-emerald-100 transition-colors">
              <span className="text-sm text-slate-600 font-medium">
                Driver on the way to warehouse
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                5m ago
              </span>
            </li>
            <li className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 border border-transparent hover:border-slate-200 transition-colors">
              <span className="text-sm text-slate-600 font-medium">
                Customer feedback received
              </span>
              <span className="text-xs font-bold text-slate-400 bg-white px-2 py-1 rounded-lg border">
                10m ago
              </span>
            </li>
          </ul>
        </div>

        {/* Quick Action Card Component */}
        <div className="h-full">
          <QuickActionCard
            title="Optimize delivery route"
            description="Gunakan analisis rute terbaru untuk mempercepat pengiriman dan mengurangi biaya."
            buttonText="Lihat Rute"
          />
        </div>
      </div>
    </div>
  );
}
