import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const NavBar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <div className="nav-list">
        <Link className="nav-link" to="/">
          Home
        </Link>

        {isLoggedIn ? (
          <button className="nav-link" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link className="nav-link" to="/login">
            Login
          </Link>
        )}

        <Link className="nav-link" to="/manage-posts">
          Manage Posts
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
