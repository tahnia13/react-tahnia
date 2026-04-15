import { FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function RecentOrders() {
    const orders = [
        { id: "ORD-001", customer: "Budi Santoso", date: "2025-01-15", total: "Rp.150.000", status: "Delivered" },
        { id: "ORD-002", customer: "Siti Aminah", date: "2025-01-15", total: "Rp.75.000", status: "Processing" },
        { id: "ORD-003", customer: "Agus Wijaya", date: "2025-01-14", total: "Rp.200.000", status: "Canceled" },
        { id: "ORD-004", customer: "Dewi Kartika", date: "2025-01-14", total: "Rp.95.000", status: "Delivered" },
        { id: "ORD-005", customer: "Rizki Ramadhan", date: "2025-01-13", total: "Rp.180.000", status: "Processing" },
    ];

    const getStatusColor = (status) => {
        switch(status) {
            case 'Delivered': return 'text-green-600 bg-green-100';
            case 'Processing': return 'text-blue-600 bg-blue-100';
            case 'Canceled': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'Delivered': return <FaCheckCircle className="mr-1" />;
            case 'Canceled': return <FaTimesCircle className="mr-1" />;
            default: return null;
        }
    };

    return (
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                <button className="text-hijau hover:underline text-sm">View All →</button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Order ID</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Customer</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Date</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Total</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Status</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="p-3 text-sm text-gray-700">{order.id}</td>
                                <td className="p-3 text-sm text-gray-700">{order.customer}</td>
                                <td className="p-3 text-sm text-gray-500">{order.date}</td>
                                <td className="p-3 text-sm font-semibold text-gray-800">{order.total}</td>
                                <td className="p-3">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <button className="text-blue-500 hover:text-blue-700">
                                        <FaEye />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}