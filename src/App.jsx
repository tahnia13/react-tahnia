import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import FormOrder from "./pages/FormOrder";
import FormCustomer from "./pages/FormCustomer";
import ErrorPage from "./components/ErrorPage";
import "./assets/tailwind.css";
import MainLayout from "./layouts/MainLayout";


function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/add-orders" element={<FormOrder />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/add-customers" element={<FormCustomer />} />
      </Route>

      {/* Halaman Error Testing */}
      <Route
        path="/error-400"
        element={
          <ErrorPage
            kodeError="400"
            deskripsiError="Bad Request. Permintaan tidak valid."
            gambarError="/img/error-400.png"
          />
        }
      />
      <Route
        path="/error-401"
        element={
          <ErrorPage
            kodeError="401"
            deskripsiError="Unauthorized. Anda tidak memiliki akses."
            gambarError="/img/error-401.png"
          />
        }
      />
      <Route
        path="/error-403"
        element={
          <ErrorPage
            kodeError="403"
            deskripsiError="Forbidden. Akses dilarang."
            gambarError="/img/error-403.png"
          />
        }
      />

      {/* Fallback 404 */}
      <Route
        path="*"
        element={
          <ErrorPage
            kodeError="404"
            deskripsiError="Page Not Found. Halaman tidak ditemukan."
            gambarError="/img/error-404.png"
          />
        }
      />
    </Routes>
  );
}

export default App;
