import React from "react";
import { connect } from "react-redux";
import { deleteMessageAction } from "../../../store/actions/chatActions";

function ReveivedMessage({ message, time, isSent, deleteMessage, user }) {
  time = new Date(time);
  const hour =
    ("0" + time.getHours()).slice(-2) +
    ":" +
    ("0" + time.getMinutes()).slice(-2);

  return (
    <div
      className="message d-flex w-100"
      onClick={() => {
        if (message.senderUserID === user._id) deleteMessage(message);
      }}
    >
      <div className="message-inner d-flex w-100 mt-2">
        <div
          className={
            isSent
              ? "sent-message ml-auto mr-3 text-right"
              : "received-message mr-auto ml-3"
          }
        >
          <p className="message-p w-100 p-3">{message.message}</p>
          <p className="time-p">{hour}</p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return { user: state.auth.user };
};

export default connect(
  mapStateToProps,
  { deleteMessage: deleteMessageAction }
)(ReveivedMessage);
