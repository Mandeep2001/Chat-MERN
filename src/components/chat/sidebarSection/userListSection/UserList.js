import React from "react";
import { connect } from "react-redux";
import User from "./User";

function UserList({ usersList, searchedUsers, activeUser }) {
  let isActive = false;
  const list = usersList.map(({ user }) => {
    if (activeUser && user._id === activeUser.user._id) {
      isActive = true;
    } else {
      isActive = false;
    }
    return (
      <div className="user-list-link" key={user._id}>
        <User data={{ user, isActive }} />
      </div>
    );
  });

  const users =
    searchedUsers &&
    searchedUsers.map(({ user }) => {
      return (
        <div className="user-list-link" key={user._id}>
          <User data={{ user, isActive: false }} />
        </div>
      );
    });

  return (
    <div className="user-list h-100 flex-grow-1 d-flex flex-column">
      {searchedUsers ? users : list}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    usersList: state.chat.usersList,
    searchedUsers: state.chat.searchedUsers,
    activeUser: state.chat.activeUser
  };
};

export default connect(mapStateToProps)(UserList);
