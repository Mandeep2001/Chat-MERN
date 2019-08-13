import React, { Component } from "react";
import { connect } from "react-redux";

export class ProfileDetails extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.user.username}</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps)(ProfileDetails);
