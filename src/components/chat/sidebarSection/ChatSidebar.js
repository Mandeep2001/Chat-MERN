import React from "react";
import SearchForm from "./SearchForm";
import UserList from "./UserList";
import OptionBar from "./OptionBar";

function ChatSidebar() {
  return (
    <div className="chat-sidebar d-flex flex-column">
      <SearchForm />
      <UserList />
      <OptionBar />
    </div>
  );
}

export default ChatSidebar;
