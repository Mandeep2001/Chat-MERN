import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { logoutAction } from "../../../store/actions/authActions";

function Navbar(props) {
  const { user, isLogged, logoutAction } = props;

  const navLinks = isLogged ? (
    <SignedInLinks user={user} logout={logoutAction} />
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
  return { user: state.auth.user, isLogged: !!state.auth.user.token };
};

export default connect(
  mapStateToProps,
  { logoutAction }
)(Navbar);
