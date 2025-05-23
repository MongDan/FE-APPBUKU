// src/components/AdminRoute.js
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("role"); // atau dari context

  if (role !== "ADMIN") {
    // Redirect ke halaman user atau login
    return <Navigate to="/user/home" replace />;
  }

  return children;
};

export default AdminRoute;
