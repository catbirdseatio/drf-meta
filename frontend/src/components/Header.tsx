import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";

const Header = () => {
  const { user, logout } = useUser();
  return (
    <nav>
      <h2>DRF-Meta</h2>
      {
        <>
          {user ? (
            <>
              <p>{user.email}</p>
              <a onClick={() => logout()}>Logout</a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link> |{" "}
              <Link to="/register">Register</Link>
            </>
          )}
        </>
      }
      <hr />
    </nav>
  );
};

export default Header;
