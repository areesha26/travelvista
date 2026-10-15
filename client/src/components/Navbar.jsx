
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        Travel<span>Vista</span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <a href="#destinations">Destinations</a>
        <a href="#about">About</a>
      </nav>

      <div className="nav-actions">
        <Link to="/login" className="login-link">
          Login
        </Link>

        <Link to="/signup" className="signup-btn">
          Sign Up
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
