import React from "react";
import { NavLink } from "react-router-dom";

function SignedOutLinks() {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink exact to="/" className="nav-link">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={"/login"} className="nav-link">
          Accedi
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/register" className="nav-link">
          Iscriviti
        </NavLink>
      </li>
    </ul>
  );
}

export default SignedOutLinks;
