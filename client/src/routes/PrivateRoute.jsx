import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { userData, isLoggedIn, loading } = useAuth();

  if (loading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  return (isLoggedIn && userData.isLoggedIn) || userData.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
