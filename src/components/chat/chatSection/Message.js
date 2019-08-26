import React from "react";

function ReveivedMessage({ message, time, isSent }) {
  time = new Date(time);
  const hour =
    ("0" + time.getHours()).slice(-2) +
    ":" +
    ("0" + time.getMinutes()).slice(-2);
  return (
    <div
      className={
        isSent
          ? "message sent-message ml-auto mr-4 mt-3"
          : "message received-message mr-auto ml-4 mt-3"
      }
    >
      <p className="my-auto">{message}</p>
      <p>{`${hour}`}</p>
    </div>
  );
}

export default ReveivedMessage;
