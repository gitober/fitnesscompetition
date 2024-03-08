import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("user"); // Check if the user is logged in

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Dashboard</h1>
        </Link>
        <nav>
          {isLoggedIn ? (
            <div>
              <span>my.email@email.com</span>
              <button onClick={() => { localStorage.removeItem("user"); localStorage.removeItem("token"); navigate("/login"); }}>Log out</button>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
