import React, { Component } from "react";
import { connect } from "react-redux";
import { registerAction } from "../../store/actions/authActions";
import RegisterForm from "./RegisterForm";

export class Register extends Component {
  handleSubmit = credentials => {
    return new Promise((resolve, reject) => {
      this.props
        .onRegister(credentials)
        .then(() => {
          this.props.history.push("/");
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  render() {
    return (
      <div className="my-auto">
        <RegisterForm submit={this.handleSubmit} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    registerError: state.auth.registerError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: user => dispatch(registerAction(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
