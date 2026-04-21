import { FaHome, FaShoppingCart, FaUsers, FaPlus } from "react-icons/fa";

export default function Sidebar() {
    return (
        <div id="sidebar" className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
            {/* Logo */}
            <div id="sidebar-logo" className="flex flex-col mb-10">
                <span id="logo-title" className="font-poppins text-[48px] text-gray-900">
                    Sedap <b id="logo-dot" className="text-hijau">.</b>
                </span>
                <span id="logo-subtitle" className="font-semibold text-gray-400">Modern Admin Dashboard</span>
            </div>

            {/* List Menu */}
            <div id="sidebar-menu" className="mb-10">
                <ul id="menu-list" className="space-y-3">
                    <li id="menu-1" className="flex items-center rounded-xl bg-slate-100 px-4 py-3 text-slate-700 hover:bg-slate-200 cursor-pointer">
                        <FaHome className="mr-4 text-xl" />
                        <span>Dashboard</span>
                    </li>
                    <li id="menu-2" className="flex items-center rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-100 cursor-pointer">
                        <FaShoppingCart className="mr-4 text-xl" />
                        <span>Orders</span>
                    </li>
                    <li id="menu-3" className="flex items-center rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-100 cursor-pointer">
                        <FaUsers className="mr-4 text-xl" />
                        <span>Customers</span>
                    </li>
                </ul>
            </div>

            {/* Footer */}
            <div id="sidebar-footer" className="mt-auto">
                <div id="footer-card" className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center gap-4">
                    <div id="footer-text" className="text-white text-sm">
                        <span>Please organize your menus through button below!</span>
                        <div id="add-menu-button" className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2">
                            <FaPlus className="text-gray-600" />
                            <span className="text-gray-600">Add Menus</span>
                        </div>
                    </div>
                    <img id="footer-avatar" className="w-20 rounded-full object-cover" src="/img/profil.jpg" alt="Avatar" />
                </div>
                <span id="footer-brand" className="font-bold text-gray-400">Sedap Restaurant Admin Dashboard</span>
                <p id="footer-copyright" className="font-light text-gray-400">&copy; 2025 All Right Reserved</p>
            </div>
        </div>
    );
}
