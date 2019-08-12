import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

function Navbar(props) {
  const { user } = props;

  const navLinks = user ? (
    <SignedInLinks user={user} />
  ) : (
    <SignedOutLinks user={user} />
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
      <div className="container-fluid">
        <Link className="navbar-brand mr-auto" to="/">
          Navbar
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {navLinks}
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = state => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps)(Navbar);
