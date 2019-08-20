/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { connect } from "react-redux";

function Header({ user }) {
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
        <h1 className="my-auto">{user.username}</h1>
      </div>
    </div>
  );
}

// FIXME: Migliorare questa sezione, invece di far apparire il proprio profilo fare una specie di home che compare quando nessun
// utente è selezionato
const mapStateToProps = state => {
  if (state.chat.activeUser !== null) return { user: state.chat.activeUser[0] };
  else return { user: state.auth.user };
};

export default connect(mapStateToProps)(Header);
