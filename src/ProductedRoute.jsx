import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowed_roles }) => {

  const role = localStorage.getItem("role");

  // Admin can access everything
  if (role === "admin") {
    return children;
  }

  if (allowed_roles.includes(role)) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;