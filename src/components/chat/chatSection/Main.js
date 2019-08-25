import React from "react";
import { connect } from "react-redux";
import SendedMessage from "./SendedMessage";
import ReceivedMessage from "./ReceivedMessage";

function Main({ user, messages }) {
  const messageList = messages.map(msg => {
    return msg.senderUserID !== user._id ? (
      <SendedMessage message={msg.message} key={msg._id} />
    ) : (
      <ReceivedMessage message={msg.message} key={msg._id} />
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
