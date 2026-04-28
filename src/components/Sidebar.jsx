import {
  FaHome,
  FaShoppingCart,
  FaUsers,
  FaPlus,
  FaExclamationTriangle,
  FaLock,
  FaBan,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  // Fungsi styling untuk menu NavLink (tetap menggunakan logic milikmu)
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2 transition-all duration-200
        ${
          isActive
            ? "text-hijau bg-green-100 font-extrabold shadow-sm"
            : "text-gray-600 hover:text-hijau hover:bg-green-50 hover:font-extrabold"
        }`;

  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg sticky top-0 overflow-y-auto"
    >
      {/* Logo */}
      <div id="sidebar-logo" className="flex flex-col mb-10">
        <span
          id="logo-title"
          className="font-poppins text-[48px] text-gray-900 leading-tight"
        >
          Sedap{" "}
          <b id="logo-dot" className="text-hijau">
            .
          </b>
        </span>
        <span id="logo-subtitle" className="font-semibold text-gray-400">
          Modern Admin Dashboard
        </span>
      </div>

      {/* List Menu Utama */}
      <div id="sidebar-menu" className="mb-6">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-4">
          Main Menu
        </p>
        <ul id="menu-list" className="space-y-3">
          <li>
            <NavLink to="/" className={menuClass}>
              <FaHome className="text-xl" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={menuClass}>
              <FaShoppingCart className="text-xl" />
              <span>Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/customers" className={menuClass}>
              <FaUsers className="text-xl" />
              <span>Customers</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Section Error Testing (Sesuai Instruksi Latihan) */}
      <div id="error-menu" className="mb-10">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-4">
          Error Testing
        </p>
        <ul className="space-y-3">
          <li>
            <NavLink to="/error-400" className={menuClass}>
              <FaExclamationTriangle className="text-xl text-amber-500" />
              <span>Error 400</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/error-401" className={menuClass}>
              <FaLock className="text-xl text-red-500" />
              <span>Error 401</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/error-403" className={menuClass}>
              <FaBan className="text-xl text-rose-600" />
              <span>Error 403</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div id="sidebar-footer" className="mt-auto">
        <div
          id="footer-card"
          className="bg-hijau px-4 py-4 rounded-xl shadow-lg mb-8 flex items-center gap-4"
        >
          <div id="footer-text" className="text-white text-xs flex-1">
            <p className="mb-3">
              Please organize your menus through button below!
            </p>
            <div
              id="add-menu-button"
              className="flex justify-center items-center py-2 bg-white rounded-lg space-x-2 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <FaPlus className="text-gray-600" />
              <span className="text-gray-600 font-bold">Add Menus</span>
            </div>
          </div>
          <img
            id="footer-avatar"
            className="w-16 h-16 rounded-full border-2 border-white/50 object-cover"
            src="/img/cewekCantik.png"
            alt="Avatar"
          />
        </div>
        <div className="px-2">
          <span id="footer-brand" className="font-bold text-gray-400 text-sm">
            Sedap Restaurant Admin
          </span>
          <p
            id="footer-copyright"
            className="font-light text-gray-400 text-[10px] mt-1"
          >
            &copy; 2026 All Right Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
