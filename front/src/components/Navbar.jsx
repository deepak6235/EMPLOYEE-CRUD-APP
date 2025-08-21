import React from "react";
import { Link } from "react-router-dom";
import "./styles/nav.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Employee Manager</h1>
      <div className="navbar-actions">
        <Link to="/" className="navbar-btn">Home</Link>

      </div>
    </nav>
  );
}

export default Navbar;
