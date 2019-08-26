import React from "react";

function ReveivedMessage({ message, time, isSent }) {
  time = new Date(time);
  const hour =
    ("0" + time.getHours()).slice(-2) +
    ":" +
    ("0" + time.getMinutes()).slice(-2);

  return (
    <div className="message d-flex w-100">
      <div className="message-inner d-flex w-100 mt-2">
        <div
          className={
            isSent
              ? "sent-message ml-auto mr-3 text-right"
              : "received-message mr-auto ml-3"
          }
        >
          <p className="message-p w-100 p-3">{message}</p>
          <p className="time-p">{hour}</p>
        </div>
      </div>
    </div>
  );
}

export default ReveivedMessage;
