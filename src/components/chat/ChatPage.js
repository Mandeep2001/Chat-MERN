import React, { Component } from "react";
import { connect } from "react-redux";
import Chat from "./chatSection/Chat";
import ChatSidebar from "./sidebarSection/ChatSidebar";
import {
  loadUsersAction,
  setSocketAction,
  receiveMessageAction
} from "../../store/actions/chatActions";
import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:5000/");

class ChatPage extends Component {
  componentDidMount() {
    this.props.loadUsers();
    this.props.setSocket(socket);
  }

  render() {
    socket.on("connect", () => {
      socket.emit("new_user", {
        username: this.props.user.username,
        _id: this.props.user._id
      });
    });

    socket.on("message", data => {
      this.props.receiveMessage(data);
    });
    return (
      <div className="container d-flex justify-content-between h-100 chat-page">
        <Chat />
        <ChatSidebar />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  {
    loadUsers: loadUsersAction,
    setSocket: setSocketAction,
    receiveMessage: receiveMessageAction
  }
)(ChatPage);
