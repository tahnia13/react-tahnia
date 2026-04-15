import { useState } from 'react';
import { MdDashboard, MdShoppingBag, MdPeople, MdMenu, MdChevronLeft } from 'react-icons/md';
import { FiPlus } from 'react-icons/fi';

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('Dashboard');

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const menus = [
        { id: 'Dashboard', icon: <MdDashboard />, label: 'Dashboard' },
        { id: 'Orders', icon: <MdShoppingBag />, label: 'Orders' },
        { id: 'Customers', icon: <MdPeople />, label: 'Customers' },
    ];

    return (
        <div className={`bg-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-20 p-4' : 'w-[360px] p-10'} flex flex-col min-h-screen relative`}>
            
            {/* Tombol Collapse */}
            <button 
                onClick={toggleSidebar}
                className="absolute -right-3 top-10 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors z-10"
            >
                {isCollapsed ? <MdMenu className="text-gray-600" /> : <MdChevronLeft className="text-gray-600" />}
            </button>

            {/* Logo */}
            <div className={`flex flex-col ${isCollapsed ? 'items-center' : ''}`}>
                <span className={`font-poppins text-gray-900 ${isCollapsed ? 'text-2xl' : 'text-[48px]'}`}>
                    S{!isCollapsed && <span>edap <b className="text-hijau">.</b></span>}
                </span>
                {!isCollapsed && (
                    <span className="font-semibold text-gray-400 text-sm">
                        Modern Admin Dashboard
                    </span>
                )}
            </div>

            {/* List Menu */}
            <div className="mt-10 flex-1">
                <ul className="space-y-3">
                    {menus.map((menu) => (
                        <li key={menu.id}>
                            <div 
                                onClick={() => setActiveMenu(menu.id)}
                                className={`flex cursor-pointer items-center rounded-xl p-4 font-medium transition-all
                                    ${activeMenu === menu.id 
                                        ? 'bg-hijau text-white shadow-md' 
                                        : 'text-gray-600 hover:bg-green-200 hover:text-hijau hover:font-extrabold'
                                    }
                                    ${isCollapsed ? 'justify-center' : ''}
                                `}
                            >
                                <div className={`text-xl ${!isCollapsed && 'mr-4'}`}>
                                    {menu.icon}
                                </div>
                                {!isCollapsed && <span>{menu.label}</span>}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Footer - Hanya tampil jika tidak collapsed */}
            {!isCollapsed && (
                <div className="mt-auto">
                    <div className="flex items-center rounded-md bg-hijau p-4 shadow-lg mb-10">
                        <div className="flex-1">
                            <span className="text-sm text-white">
                                Please organize your menus through button below!
                            </span>
                            <div className="mt-3 flex items-center justify-center space-x-2 rounded-md bg-white p-2">
                                <FiPlus className="text-hijau text-lg" />
                                <span className="text-hijau font-medium">Add Menus</span>
                            </div>
                        </div>
                        <img 
                            className="w-16 h-16 rounded-lg object-cover ml-4"
                            src="img/cewekCantik.png" 
                            alt="Avatar"
                        />
                    </div>
                    <span className="block text-center font-bold text-gray-400 text-xs">
                        Sedap Restaurant
                    </span>
                    <p className="text-center font-light text-gray-400 text-xs">
                        &copy; 2025 All Right Reserved
                    </p>
                </div>
            )}
        </div>
    );
}