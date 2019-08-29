import React from "react";
import { connect } from "react-redux";
import Message from "./Message";

function Main({ user, messages }) {
  messages.sort((a, b) => {
    return a.createdAt > b.createdAt ? 1 : -1;
  });

  const messageList = messages.map(msg => {
    return (
      <Message
        message={msg}
        time={msg.createdAt}
        isSent={msg.senderUserID !== user._id}
        key={msg._id}
        _id={msg._id}
      />
    );
  });

  return (
    <div className="chat-main d-flex flex-column flex-grow-1 h-100">
      {messageList}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.chat.activeUser.user,
    messages: state.chat.activeUser.messages
  };
};

export default connect(mapStateToProps)(Main);
