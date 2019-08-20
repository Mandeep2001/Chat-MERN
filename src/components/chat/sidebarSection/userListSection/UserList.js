import React from "react";
import { connect } from "react-redux";
import User from "./User";
import { changeActiveUserAction } from "../../../../store/actions/chatActions";

function UserList({ usersList, changeActiveUser }) {
  const list = usersList.map(user => {
    return (
      <div
        className="user-list-link"
        key={user._id}
        onClick={event => {
          const username = event.target.children[1].innerHTML;
          changeActiveUser(username);
        }}
      >
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

export default connect(
  mapStateToProps,
  { changeActiveUser: changeActiveUserAction }
)(UserList);
