/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { changeActiveUserAction } from "../../../../store/actions/chatActions";

function User({ data, changeActiveUser }) {
  const [username, setUsername] = useState();

  useEffect(() => {
    data.user && setUsername(data.user.username);
  }, [data]);

  return data.user ? (
    <div
      className={"user-list-single-user " + (data.isActive && "active-user")}
      onClick={event => {
        changeActiveUser(username);
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
  ) : (
    <div>Nessun utente trovato</div>
  );
}

const mapStateToProps = state => {
  return { usersList: state.chat.usersList };
};

export default connect(
  mapStateToProps,
  { changeActiveUser: changeActiveUserAction }
)(User);
