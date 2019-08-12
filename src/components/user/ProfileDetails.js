import React, { Component } from "react";
import { connect } from "react-redux";

export class ProfileDetails extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h2>{this.props.user.info.username}</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps)(ProfileDetails);
