import { useState } from 'react';
import { FaBell, FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    const [isDark, setIsDark] = useState(false);

    const toggleDarkMode = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <div id="header-container" className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 transition-colors">
            {/* Search Bar */}
            <div id="search-bar" className="relative w-full max-w-lg">
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search Here..."
                    className="border border-gray-100 p-2 pr-10 bg-white dark:bg-gray-700 dark:text-white w-full max-w-lg rounded-md outline-none"
                />
                <FaSearch id="search-icon" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
            </div>

            {/* Icon & Profile Section */}
            <div id="icons-container" className="flex items-center space-x-4">
                {/* Dark Mode Toggle */}
                <div 
                    onClick={toggleDarkMode}
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-2xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                    {isDark ? <FaSun className="text-yellow-500 text-xl" /> : <FaMoon className="text-gray-600 text-xl" />}
                </div>

                <div id="notification-icon" className="relative p-3 bg-blue-100 dark:bg-blue-900 rounded-2xl text-blue-500 cursor-pointer">
                    <FaBell />
                    <span id="notification-badge" className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-200 dark:bg-blue-700 rounded-full px-2 py-1 text-xs">50</span>
                </div>
                
                <div id="chart-icon" className="p-3 bg-blue-100 dark:bg-blue-900 rounded-2xl cursor-pointer">
                    <FcAreaChart />
                </div>
                
                <div id="settings-icon" className="p-3 bg-red-100 dark:bg-red-900 rounded-2xl text-red-500 cursor-pointer">
                    <SlSettings />
                </div>

                <div id="profile-container" className="flex items-center space-x-4 border-l pl-4 border-gray-300 dark:border-gray-600">
                    <span id="profile-text" className="dark:text-gray-300">
                        Hello, <b>Tahnia Siti Aisah</b>
                    </span>
                    <img
                        id="profile-avatar"
                        src="img/cewekCantik.png"
                        className="w-10 h-10 rounded-full object-cover"
                        alt="Avatar"
                    />
                </div>
            </div>
        </div>
    );
}