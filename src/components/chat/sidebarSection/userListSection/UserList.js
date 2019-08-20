import React from "react";
import { connect } from "react-redux";
import User from "./User";

function UserList({ usersList, changeActiveUser }) {
  const list = usersList.map(user => {
    return (
      <div className="user-list-link" key={user._id}>
        <User data={{ user, isActive: false }} />
      </div>
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
