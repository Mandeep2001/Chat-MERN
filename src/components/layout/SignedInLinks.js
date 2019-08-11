import React from "react";
import { NavLink } from "react-router-dom";

function SignedInLinks({ user }) {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink exact to="/" className="nav-link">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/chat" className="nav-link">
          Chat
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={"/" + user.info.username} className="nav-link">
          Profilo
        </NavLink>
      </li>
    </ul>
  );
}

export default SignedInLinks;
