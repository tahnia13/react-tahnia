import PageHeader from "../components/PageHeader";

export default function Customers() {
    return (
        <div id="customers-container">
            <PageHeader title="Customer" breadcrumbs={["Dashboard", "Customer List"]} />
            
            <div className="p-5">
                <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold">Customer</h2>
                        <p className="text-gray-500 mt-2">Ini Halaman Customer</p>
                    </div>
                    <button className="bg-hijau text-white px-6 py-2 rounded-lg hover:bg-emerald-600">
                        Add New Customer
                    </button>
                </div>
            </div>
        </div>
    );
}