import { Navigate } from "react-router-dom";
import { toast } from "sonner";

export default function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Login First ❌");
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
