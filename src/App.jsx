import { Routes, Route } from "react-router-dom";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import FormOrder from "./pages/FormOrder";
import FormCustomer from "./pages/FormCustomer";
import ErrorPage from "./components/ErrorPage";
import "./assets/tailwind.css";


function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <div id="layout-wrapper" className="flex flex-row flex-1">
        <Sidebar />
        <div id="main-content" className="flex-1 flex flex-col">
          <Header />

          <div className="p-4 flex-1">
            <Routes>
              {/* Halaman Utama */}
              <Route path="/" element={<Dashboard />} />
              
              {/* Halaman Orders & Formnya */}
              <Route path="/orders" element={<Orders />} />
              <Route path="/add-orders" element={<FormOrder />} />
              
              {/* Halaman Customers & Formnya */}
              <Route path="/customers" element={<Customers />} />
              <Route path="/add-customers" element={<FormCustomer />} />

              {/* Halaman Error Testing */}
              <Route path="/error-400" element={
                <ErrorPage kodeError="400" deskripsiError="Bad Request. Permintaan tidak valid." gambarError="/img/error-400.png" />
              } />
              <Route path="/error-401" element={
                <ErrorPage kodeError="401" deskripsiError="Unauthorized. Anda tidak memiliki akses." gambarError="/img/error-401.png" />
              } />
              <Route path="/error-403" element={
                <ErrorPage kodeError="403" deskripsiError="Forbidden. Akses dilarang." gambarError="/img/error-403.png" />
              } />

              {/* Fallback 404 */}
              <Route path="*" element={
                <ErrorPage kodeError="404" deskripsiError="Page Not Found. Halaman tidak ditemukan." gambarError="/img/error-404.png" />
              } />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;