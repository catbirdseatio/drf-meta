import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { isAuthenticated } from "../utils";

const PublicRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  return isAuthenticated() ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
