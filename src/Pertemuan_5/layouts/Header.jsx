import { useState } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";
import SearchModal from "../components/SearchModal";

export default function Header() {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <>
            <div id="header-container" className="flex justify-between items-center p-4">
                {/* Search Bar */}
                <div id="search-bar" className="relative w-full max-w-lg">
                    <input
                        id="search-input"
                        className="border border-gray-100 p-2 pr-10 bg-white w-full max-w-lg rounded-md outline-none cursor-pointer"
                        type="text"
                        placeholder="Search Here..."
                        onFocus={() => setSearchOpen(true)}
                        readOnly
                    />
                    <FaSearch
                        id="search-icon"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 cursor-pointer"
                        onClick={() => setSearchOpen(true)}
                    />
                </div>

                {/* Icon & Profile Section */}
                <div id="icons-container" className="flex items-center space-x-3">
                    <div id="icons-group" className="flex items-center space-x-3">
                        <div id="notification-wrapper" className="relative">
                            <div id="notification-icon" className="bg-sky-100 text-sky-600 p-3 rounded-2xl shadow-sm">
                                <FaBell className="text-xl" />
                            </div>
                            <span id="notification-badge" className="absolute -top-2 -right-2 bg-sky-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                50
                            </span>
                        </div>
                        <div id="chart-icon" className="bg-slate-100 p-3 rounded-2xl shadow-sm text-slate-700">
                            <FcAreaChart className="text-xl" />
                        </div>
                        <div id="settings-icon" className="bg-pink-100 p-3 rounded-2xl shadow-sm text-pink-600">
                            <SlSettings className="text-xl" />
                        </div>
                    </div>

                    <div className="h-10 w-px bg-slate-200" />

                    {/* Profile Section */}
                    <div id="profile-container" className="flex items-center gap-3">
                        <span id="profile-text" className="text-sm">
                            Hello, <b>Dipa Tranggana</b>
                        </span>
                        <div className="rounded-full bg-slate-100 p-1">
                            <img
                                id="profile-avatar"
                                src="/img/profil.jpg"
                                alt="Profile avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}

