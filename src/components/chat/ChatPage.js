import React, { useEffect } from "react";
import { connect } from "react-redux";
import Chat from "./chatSection/Chat";
import ChatSidebar from "./sidebarSection/ChatSidebar";
import { loadUsersAction } from "../../store/actions/chatActions";

function ChatPage({ loadUsers }) {
  useEffect(() => {
    loadUsers();
  });
  return (
    <div className="container d-flex justify-content-between h-100 chat-page">
      <Chat />
      <ChatSidebar />
    </div>
  );
}

export default connect(
  null,
  { loadUsers: loadUsersAction }
)(ChatPage);
