import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminProtectedRoute from "./pages/AdminProtectedRoute";

import About from "./pages/About";
import BillDetail from "./pages/BillDetail";
import BillList from "./pages/BillList";
import BillMaker from "./pages/BillMaker";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer"; // ✅ correct folder
import Header from "./pages/Header";
import Pages from "./pages/Pages";
import ProductDetail from "./pages/Product";
import SearchResults from "./pages/SearchResults";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Pages />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>} ></Route>
        <Route path="/search" element={<SearchResults />} />

        {/* Billing */}
        <Route path="/bill" element={<BillMaker />} />
        <Route path="/bill/show" element={<BillList />} />
        <Route path="/bill/show/:id" element={<BillDetail />} />

        {/* Admin */}
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

      <Footer />
    </BrowserRouter>
  );
}
