/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { connect } from "react-redux";
import {
  changeActiveUserAction,
  getMessagesAction
} from "../../../../store/actions/chatActions";

function User({ data, changeActiveUser, getMessages }) {
  return (
    <div
      className={"user-list-single-user " + (data.isActive && "active-user")}
      onClick={event => {
        const username = event.target.children[1].getAttribute("username"); // FIXME: la pagina si ricarica e da errore
        changeActiveUser(username);
        getMessages();
      }}
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
        <h2 className="my-auto" username={data.user.username}>
          {data.user.username}
        </h2>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return { usersList: state.chat.usersList };
};

export default connect(
  mapStateToProps,
  { changeActiveUser: changeActiveUserAction, getMessages: getMessagesAction }
)(User);
