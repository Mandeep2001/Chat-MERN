import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SendedMessage from "./SendedMessage";
import ReceivedMessage from "./ReceivedMessage";

function Main({ activeUser }) {
  const [messageList, setMessages] = useState();

  useEffect(() => {
    setMessages(
      activeUser.messages.map(msg => {
        return msg.senderUserID !== activeUser.user._id ? (
          <SendedMessage message={msg.message} key={msg._id} />
        ) : (
          <ReceivedMessage message={msg.message} key={msg._id} />
        );
      })
    );
  }, [activeUser]);

  return (
    <div className="d-flex flex-column flex-grow-1 h-100">{messageList}</div>
  );
}

const mapStateToProps = state => {
  return {
    activeUser: state.chat.activeUser[0]
  };
};

export default connect(mapStateToProps)(Main);
