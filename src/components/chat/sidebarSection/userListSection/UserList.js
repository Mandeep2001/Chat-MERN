import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import User from "./User";

function UserList({ usersList }) {
  const list = usersList.map(user => {
    return (
      <Link to="/" className="user-list-link" key={user._id}>
        <User user={{ name: user.username, isActive: false }} />
      </Link>
    );
  });

  return (
    <div className="user-list h-100 flex-grow-1 d-flex flex-column">{list}</div>
  );
}

const mapStateToProps = state => {
  return { usersList: state.chat.usersList };
};

export default connect(mapStateToProps)(UserList);
