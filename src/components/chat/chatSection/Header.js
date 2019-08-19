/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { connect } from "react-redux";

function Header({ user }) {
  console.log(user);
  return (
    <div className="header">
      <div className="content d-flex">
        <div className="profile-image">
          <img
            src={
              user.profileImageURL === ""
                ? "http://pronksiapartments.ee/wp-content/uploads/2015/10/placeholder-face-big.png"
                : user.profileImageURL
            }
            alt="Profile image"
            className="mr-3"
          />
        </div>
        <h1 className="my-auto">Mark Zuckerberg</h1>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps)(Header);
