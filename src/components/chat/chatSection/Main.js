import React from "react";
import { connect } from "react-redux";
import Message from "./Message";

function Main({ user, messages }) {
  messages.sort((a, b) => {
    return a.createdAt > b.createdAt ? 1 : -1;
  });

  const messageList = messages.map(msg => {
    return msg.senderUserID !== user._id ? (
      <Message
        message={msg.message}
        time={msg.createdAt}
        isSent={true}
        key={msg._id}
      />
    ) : (
      <Message
        message={msg.message}
        time={msg.createdAt}
        isSent={false}
        key={msg._id}
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
    user: state.chat.activeUser[0].user,
    messages: state.chat.activeUser[0].messages
  };
};

export default connect(mapStateToProps)(Main);
