import "./assets/tailwind.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";
import React, { Suspense } from "react";

// LAZY IMPORTS - All pages
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const FormOrder = React.lazy(() => import("./pages/FormOrder"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const FormCustomer = React.lazy(() => import("./pages/FormCustomer"));
const Produk = React.lazy(() => import("./pages/produk"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const Cart = React.lazy(() => import("./pages/Cart"));
const ErrorPage = React.lazy(() => import("./components/ErrorPage"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Components = React.lazy(() => import("./pages/Components/components"));
const FiturXYZ = React.lazy(() => import("./pages/FiturXYZ"));
const Notes = React.lazy(() => import("./pages/Notes"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Protected Routes - With Sidebar/Navbar (MainLayout) */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["admin", "member"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          
          {/* Admin Only Routes - Orders Management */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-orders"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <FormOrder />
              </ProtectedRoute>
            }
          />

          {/* Admin Only Routes - Customers Management */}
          <Route
            path="/customers"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Customers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-customers"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <FormCustomer />
              </ProtectedRoute>
            }
          />

          {/* Products - All authenticated users can view */}
          <Route path="/products" element={<Produk />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* Member Only Routes - Shopping */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute allowedRoles={["member"]}>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* Common Routes */}
          <Route path="/components" element={<Components />} />
          <Route path="/fitur-xyz" element={<FiturXYZ />} />
          <Route path="/notes" element={<Notes />} />

          {/* Error Pages */}
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

        {/* Auth Routes - Without Sidebar/Navbar (AuthLayout) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
