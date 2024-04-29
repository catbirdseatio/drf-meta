import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="col-span-12 h-[3.75rem] bg-green-400 px-4 flex justify-between items-center space-around">
      <h2 className="text-2xl">DRF Meta</h2>
      <div className="flex gap-4">
      {user ? (
        <>
          <p>{user.email}</p>
          <a onClick={() => logout()}>Logout</a>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      </div>
    </nav>
  );
};

export default Header;
