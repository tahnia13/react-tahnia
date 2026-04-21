import { useState } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";
import SearchModal from "../components/SearchModal";

export default function Header() {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <>
            <div id="header-container" className="flex justify-between items-center p-4 bg-white sticky top-0 z-10 shadow-sm md:shadow-none">
                
                {/* Search Bar - Mengecil di Mobile */}
                <div id="search-bar" className="relative w-full max-w-[150px] sm:max-w-xs md:max-w-lg transition-all duration-300">
                    <input
                        id="search-input"
                        className="border border-gray-100 p-2 pr-10 bg-gray-50 md:bg-white w-full rounded-xl outline-none cursor-pointer text-sm"
                        type="text"
                        placeholder="Search..."
                        onFocus={() => setSearchOpen(true)}
                        readOnly
                    />
                    <FaSearch
                        id="search-icon"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 cursor-pointer"
                        onClick={() => setSearchOpen(true)}
                    />
                </div>

                {/* Right Section */}
                <div id="icons-container" className="flex items-center space-x-2 md:space-x-4 ml-2">
                    
                    {/* Icons Group - Beberapa disembunyikan di layar kecil */}
                    <div id="icons-group" className="flex items-center space-x-2 md:space-x-3">
                        <div id="notification-wrapper" className="relative cursor-pointer">
                            <div id="notification-icon" className="bg-sky-100 text-sky-600 p-2 md:p-3 rounded-xl md:rounded-2xl shadow-sm">
                                <FaBell className="text-lg md:text-xl" />
                            </div>
                            <span id="notification-badge" className="absolute -top-1 -right-1 bg-sky-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                                50
                            </span>
                        </div>
                        
                        {/* Disembunyikan di Mobile (Hidden < md) */}
                        <div id="chart-icon" className="hidden md:block bg-slate-100 p-3 rounded-2xl shadow-sm text-slate-700 cursor-pointer hover:bg-slate-200 transition-colors">
                            <FcAreaChart className="text-xl" />
                        </div>
                        
                        <div id="settings-icon" className="bg-pink-100 p-2 md:p-3 rounded-xl md:rounded-2xl shadow-sm text-pink-600 cursor-pointer hover:bg-pink-200 transition-colors">
                            <SlSettings className="text-lg md:text-xl" />
                        </div>
                    </div>

                    {/* Divider - Sembunyi di mobile jika terlalu sempit */}
                    <div className="hidden sm:block h-8 w-px bg-slate-200 mx-1" />

                    {/* Profile Section */}
                    <div id="profile-container" className="flex items-center gap-2 md:gap-3 cursor-pointer">
                        {/* Nama hanya muncul di layar medium ke atas */}
                        <span id="profile-text" className="hidden lg:block text-sm whitespace-nowrap">
                            Hello, <span className="font-bold">Tahnia Siti Aisah</span>
                        </span>
                        
                        <div className="rounded-full bg-gradient-to-tr from-sky-400 to-blue-500 p-[2px] flex-shrink-0 transition-transform active:scale-95">
                            <img
                                id="profile-avatar"
                                src="/img/cewekCantik.png"
                                alt="Profile avatar"
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}