import React from "react";
import Chat from "./chatSection/Chat";
import ChatSidebar from "./ChatSidebar";

function ChatPage() {
  return (
    <div className="container d-flex justify-content-between h-100 chat-page">
      <Chat />
      <ChatSidebar />
    </div>
  );
}

export default ChatPage;
