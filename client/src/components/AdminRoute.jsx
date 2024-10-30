import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const AdminRoute = () => {
  const { userData, loading } = useAuth();

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
    }
  }, [userData]);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return userData.isAdmin ? <Outlet /> : <Navigate to="/" />;
  }
};
export default AdminRoute;
