import React, { Component } from "react";
import { connect } from "react-redux";
import UpdateProfileForm from "./UpdateProfileForm";
import { updateUserAction } from "../../store/actions/userActions";

export class ProfileDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      selectedImage: null
    };
  }

  uploadImage = image => {
    this.setState({ selectedImage: image });
  }; 

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFormSubmit = event => {
    const formData = new FormData();
    if (this.state.username !== null && this.state.username !== "")
      formData.append("username", this.state.username);
    if (this.state.password !== null && this.state.password !== "")
      formData.append("password", this.state.password);
    if (this.state.selectedImage !== null)
      formData.append("selectedImage", this.state.selectedImage);

    this.props.updateUser(formData);
  };

  render() {
    const { user } = this.props;
    return (
      <div className="profile-details h-100 w-100 d-flex flex-column justify-content-center align-items-center">
        <div className="profile-image">
          <img
            src="http://pronksiapartments.ee/wp-content/uploads/2015/10/placeholder-face-big.png"
            alt="Profile"
          />
        </div>
        <div className="custom-card d-flex w-50 justify-content-between">
          <div className="profile-stats w-100">
            <h1 className="">Statistiche</h1>
            <ul>
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
            </ul>
          </div>

          <div className="profile-info w-100">
            <h1>Informazioni</h1>
            <ul>
              <li>
                <span className="info-name">Name</span>
                <div className="info d-flex justify-content-between">
                  <p>{user.name}</p>
                </div>
              </li>
              <li>
                <span className="info-name">Username</span>
                <div className="info d-flex justify-content-between">
                  <p>{user.username}</p>
                </div>
              </li>
              <li>
                <span className="info-name">E-mail</span>
                <div className="info d-flex justify-content-between">
                  <p>{user.email}</p>
                </div>
              </li>
            </ul>
            <button
              className="update-button d-flex ml-auto"
              data-toggle="modal"
              data-target="#update-modal"
            >
              Update
            </button>

            <div
              className="modal fade"
              id="update-modal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalCenterTitle">
                      Update profile
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <UpdateProfileForm
                      uploadImage={this.uploadImage}
                      handleChange={this.handleChange}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.handleFormSubmit}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.auth.user };
};

export default connect(
  mapStateToProps,
  { updateUser: updateUserAction }
)(ProfileDetails);
