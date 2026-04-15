import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';

export default function LayoutWrapper({ children }) {
    return (
        <div id="layout-wrapper" className="bg-gray-100 min-h-screen flex">
            <div className="layout-container flex w-full">
                <Sidebar />
                <div id="main-content" className="flex-1">
                    <Header />
                    <div className="p-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}