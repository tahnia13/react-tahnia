import PageHeader from "../components/PageHeader";

export default function Orders() {
    return (
        <div id="orders-container">
            <PageHeader title="Order" breadcrumbs={["Dashboard", "Order List"]} />
            
            <div className="p-5">
                <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold">Order</h2>
                        <p className="text-gray-500 mt-2">Ini Halaman Order</p>
                    </div>
                    <button className="bg-hijau text-white px-6 py-2 rounded-lg hover:bg-emerald-600">
                        Add New Order
                    </button>
                </div>
            </div>
        </div>
    );
}