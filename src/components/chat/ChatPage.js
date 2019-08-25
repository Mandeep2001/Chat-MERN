import React, { Component } from "react";
import { connect } from "react-redux";
import Chat from "./chatSection/Chat";
import ChatSidebar from "./sidebarSection/ChatSidebar";
import {
  loadUsersAction,
  setSocketAction
} from "../../store/actions/chatActions";
import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:5000/");

class ChatPage extends Component {
  componentDidMount() {
    this.props.loadUsers();
    this.props.setSocket(socket);
  }

  render() {
    return (
      <div className="container d-flex justify-content-between h-100 chat-page">
        <Chat />
        <ChatSidebar />
      </div>
    );
  }
}

export default connect(
  null,
  { loadUsers: loadUsersAction, setSocket: setSocketAction }
)(ChatPage);
