import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = () => {
  const { userData, loading } = useAuth();

  // useEffect(() => {
  //   if (Object.keys(userData).length > 0) {
  //   }
  // }, [userData]);

  if (loading) {
    return <span className="loading loading-bars loading-lg"></span>;
  } else {
    return userData.isAdmin ? <Outlet /> : <Navigate to="/" />;
  }
};
export default AdminRoute;
