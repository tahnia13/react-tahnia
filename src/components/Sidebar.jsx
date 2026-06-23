import {
  FaHome,
  FaShoppingCart,
  FaUsers,
  FaBox,
  FaCubes,
  FaExclamationTriangle,
  FaLock,
  FaBan,
  FaPlus,
  FaStickyNote,
  FaHistory,
  FaGift,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Sidebar() {
  const { profile } = useAuth();
  const isAdmin = profile?.role === "admin";
  const isMember = profile?.role === "member";

  // Admin menu
  const adminMenus = [
    { to: "/", label: "Dashboard", Icon: FaHome },
    { to: "/customers", label: "Customers", Icon: FaUsers },
    { to: "/products", label: "Products", Icon: FaBox },
    { to: "/orders", label: "Orders", Icon: FaShoppingCart },
  ];

  // Member menu
  const memberMenus = [
    { to: "/", label: "Dashboard", Icon: FaHome },
    { to: "/products", label: "Shop", Icon: FaBox },
    { to: "/cart", label: "My Cart", Icon: FaShoppingCart },
    { to: "/orders", label: "My Orders", Icon: FaHistory },
  ];

  // Common menu for all
  const commonMenus = [
    { to: "/components", label: "Components", Icon: FaCubes },
    { to: "/notes", label: "Notes", Icon: FaStickyNote },
  ];

  // Select menu based on role
  const menus = isAdmin ? adminMenus : isMember ? memberMenus : [];

  // Fungsi styling untuk menu NavLink
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
          {isAdmin ? "Admin Dashboard" : isMember ? "Member Portal" : "Dashboard"}
        </span>
      </div>

      {/* Member Points Info */}
      {isMember && profile && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-xs text-gray-600 mb-2">Your Status</p>
          <p className="text-lg font-bold text-green-600 mb-1">{profile.tier}</p>
          <p className="text-xs text-gray-600">Points: <span className="font-bold text-green-600">{profile.points_balance}</span></p>
        </div>
      )}

      {/* List Menu Utama */}
      {menus.length > 0 && (
        <div id="sidebar-menu" className="mb-6">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-4">
            {isAdmin ? "Admin Menu" : "Member Menu"}
          </p>
          <ul id="menu-list" className="space-y-3">
            {menus.map((m) => (
              <li key={m.to}>
                <NavLink to={m.to} className={menuClass}>
                  <m.Icon className="text-xl" />
                  <span>{m.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Common Menu */}
      {commonMenus.length > 0 && (
        <div id="common-menu" className="mb-6">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-4">
            Other
          </p>
          <ul id="common-menu-list" className="space-y-3">
            {commonMenus.map((m) => (
              <li key={m.to}>
                <NavLink to={m.to} className={menuClass}>
                  <m.Icon className="text-xl" />
                  <span>{m.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Section Error Testing */}
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
