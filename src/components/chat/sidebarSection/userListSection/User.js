/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

function User({ user }) {
  return (
    <div
      className={"user-list-single-user " + (user.isActive && "active-user")}
    >
      <div className="content d-flex flex-row">
        <img
          src="https://us.123rf.com/450wm/gmast3r/gmast3r1710/gmast3r171002485/88771602-stock-vector-avatar-profile-icon-male-faceless-user-on-colorful-round-background-flat-vector-illustration.jpg?ver=6"
          alt="Profile image"
          className="my-auto"
        />
        <h2 className="my-auto">{user.name}</h2>
      </div>
    </div>
  );
}

export default User;
