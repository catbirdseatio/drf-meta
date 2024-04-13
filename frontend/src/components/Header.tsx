import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const Header = () => {
    const { user, logout } = useAuth()
  return (
    <nav>
        <h2>DRF Meta</h2>
        {user ? (<>
            <p>{user.email}</p>
            <a onClick={()=> logout()}>Logout</a>
        </>) : (<>
        <Link to="/login">Login</Link> | {" "}
        <Link to="/register">Register</Link>
        </>)}
    </nav>
  )
}

export default Header