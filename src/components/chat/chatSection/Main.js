import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SendedMessage from "./SendedMessage";
import ReceivedMessage from "./ReceivedMessage";

function Main({ userID, messages }) {
  const [messageList, setMessages] = useState();

  useEffect(() => {
    if (messages) {
      setMessages(
        messages.map(msg => {
          return msg.senderUserID !== userID ? (
            <SendedMessage message={msg.message} key={msg._id} />
          ) : (
            <ReceivedMessage message={msg.message} key={msg._id} />
          );
        })
      );
    }
  }, [messages, userID]);

  return (
    <div className="d-flex flex-column flex-grow-1 h-100">{messageList}</div>
  );
}

const mapStateToProps = state => {
  return {
    userID: state.chat.activeUser[0]._id,
    messages: state.chat.messages
  };
};

export default connect(mapStateToProps)(Main);
