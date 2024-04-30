import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type NavLinksProps = {
  isMobile?: boolean;
};

const NavLinks = ({ isMobile = false }: NavLinksProps) => {
  const { user, logout } = useAuth();

  return (
    <div
      className={
        isMobile
          ? "flex flex-col gap-2 pb-2 basis-full items-center flex-wrap bg-green-400"
          : "flex gap-4"
      }
    >
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
