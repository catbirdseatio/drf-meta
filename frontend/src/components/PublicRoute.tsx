import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";


const PublicRoute = () => {
  const { user } = useUser();
  return user ?  <Navigate to="/" /> : <Outlet />;
}

export default PublicRoute