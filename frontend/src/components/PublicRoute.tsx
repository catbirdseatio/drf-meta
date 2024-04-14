import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


const PublicRoute = () => {
  const { user } = useAuth();
  return user ?  <Navigate to="/" /> : <Outlet />;
}

export default PublicRoute