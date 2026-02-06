import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ roles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // not logged in
  if (!user) return <Navigate to="/login" replace />;

  // role check
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
