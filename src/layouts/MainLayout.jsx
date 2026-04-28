import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <div id="layout-wrapper" className="flex flex-row flex-1">
        <Sidebar />
        <div id="main-content" className="flex-1 flex flex-col">
          <Header />

          <div className="p-4 flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
