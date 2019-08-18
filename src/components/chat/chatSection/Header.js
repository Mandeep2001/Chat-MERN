/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

function Header() {
  return (
    <div className="header">
      <div className="content d-flex">
        <div className="profile-image">
          <img
            src="https://us.123rf.com/450wm/gmast3r/gmast3r1710/gmast3r171002485/88771602-stock-vector-avatar-profile-icon-male-faceless-user-on-colorful-round-background-flat-vector-illustration.jpg?ver=6"
            alt="Profile image"
            className="mr-3"
          />
        </div>
        <h1 className="my-auto">Mark Zuckerberg</h1>
      </div>
    </div>
  );
}

export default Header;
