import "./assets/tailwind.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Loading from "./components/Loading";
import React, { Suspense } from "react";

function App() {
  const Dashboard = React.lazy(() => import("./pages/Dashboard"))
  const FormOrder = React.lazy(() => import("./pages/FormOrder"))
  const Orders = React.lazy(() => import("./pages/Orders"))
  const Customers = React.lazy(() => import("./pages/Customers"))
  const FormCustomer = React.lazy(() => import("./pages/FormCustomer"))
  const ErrorPage = React.lazy(() => import("./components/ErrorPage"))
  const Login = React.lazy(() => import("./pages/auth/Login"))
  const Register = React.lazy(() => import("./pages/auth/Register"))
  const Forgot = React.lazy(() => import("./pages/auth/Forgot"))
  
  return (
    <Suspense fallback={<Loading />}>
    <Routes>
      <Route element={<MainLayout />}>

          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/add-orders" element={<FormOrder />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/add-customers" element={<FormCustomer />} />
      

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
      </Route>
      <Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot" element={<Forgot/>} />
        </Route>
    </Routes>
    </Suspense>
  );
} 

export default App;
