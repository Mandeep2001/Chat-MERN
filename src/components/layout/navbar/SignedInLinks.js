import React from "react";
import { NavLink } from "react-router-dom";

function SignedInLinks({ user, logout }) {
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
        <NavLink to={"/" + user.username} className="nav-link">
          {user.username}
        </NavLink>
      </li>
      <button className="btn btn-primary ml-3" onClick={logout}>
        Logout
      </button>
    </ul>
  );
}

export default SignedInLinks;
