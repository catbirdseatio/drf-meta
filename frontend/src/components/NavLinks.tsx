import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


const NavLinks = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <p>{user.email}</p>
          <a onClick={() => logout()}>Logout</a>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}
    </div>
  );
};

export default NavLinks;
