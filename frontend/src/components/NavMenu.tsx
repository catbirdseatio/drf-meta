import { NavLink } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const NavMenu = () => {
    const {user, logout} = useAuth()

  return (
    <>
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
        </>
  )
}

export default NavMenu