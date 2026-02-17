import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminProtectedRoute from "./pages/AdminProtectedRoute";

import Footer from "./pages/Footer"; // ✅ correct folder
import Pages from "./pages/Pages";
import ProductDetail from "./pages/Product";

export default function App() {
  return (
    <BrowserRouter>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Pages />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
      </Routes>

      {/* Universal Footer */}
      <Footer />

    </BrowserRouter>
  );
}
