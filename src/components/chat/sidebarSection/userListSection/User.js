/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

function User({ data }) {
  return (
    <div
      className={"user-list-single-user " + (data.isActive && "active-user")}
    >
      <div className="content d-flex flex-row">
        <img
          src={
            data.user.profileImageURL === ""
              ? "http://pronksiapartments.ee/wp-content/uploads/2015/10/placeholder-face-big.png"
              : data.user.profileImageURL
          }
          alt="Profile image"
          className="my-auto"
        />
        <h2 className="my-auto">{data.user.username}</h2>
      </div>
    </div>
  );
}

export default User;
