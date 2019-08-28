import React, { Component } from "react";
import { connect } from "react-redux";

export class ProfileDetails extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="profile-details h-100 w-100 d-flex flex-column justify-content-center align-items-center">
        {/* <div className="my-auto custom-card w-50 d-flex flex-column align-items-center"> */}
        <div className="profile-image">
          <img
            src="http://pronksiapartments.ee/wp-content/uploads/2015/10/placeholder-face-big.png"
            alt="Profile"
          />
        </div>
        {/* <div className="custom-card-content d-flex w-100 justify-content-between align-items-center"> */}
        <div className="custom-card d-flex w-50 justify-content-between">
          <div className="profile-stats w-100">
            <h1 className="">Statistiche</h1>
            <ul className="">
              <li className="">
                <span className="stat-name">Messaggi Inviati</span>
                <p className="stat">3591</p>
              </li>
              <li>
                <span className="stat-name">Messaggi Ricevuti</span>
                <p className="stat">6938</p>
              </li>
              <li>
                <span className="stat-name">Chat attive</span>
                <p className="stat">68</p>
              </li>
              <li>
                <span className="stat-name">Messaggi eliminati</span>
                <p className="stat">0</p>
              </li>
            </ul>
          </div>

          <div className="profile-info w-100">
            <h1>Informazioni</h1>
            <ul>
              <li>
                <span className="info-name">Name</span>
                <div className="info d-flex justify-content-between">
                  <p>{user.name}</p>
                  <i className="fas fa-pen"></i>
                </div>
              </li>
              <li>
                <span className="info-name">Username</span>
                <div className="info d-flex justify-content-between">
                  <p>{user.username}</p>
                  <i className="fas fa-pen"></i>
                </div>
              </li>
              <li>
                <span className="info-name">E-mail</span>
                <div className="info d-flex justify-content-between">
                  <p>{user.email}</p>
                  <i className="fas fa-pen"></i>
                </div>
              </li>
              <li>
                <span className="info-name">Password</span>
                <div className="info d-flex justify-content-between">
                  <p>•••••••••</p>
                  <i className="fas fa-pen"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps)(ProfileDetails);
