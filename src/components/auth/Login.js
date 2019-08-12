import React, { Component } from "react";
import { connect } from "react-redux";
import { loginAction } from "../../store/actions/authActions";
import LoginForm from "./LoginForm";

class Login extends Component {
  handleSubmit = credentials => {
    return new Promise((resolve, reject) => {
      this.props
        .onLogin(credentials)
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
        <LoginForm submit={this.handleSubmit} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loginError: state.auth.loginError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: user => dispatch(loginAction(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
