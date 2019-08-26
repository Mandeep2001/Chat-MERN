import React from "react";

function ReveivedMessage({ message, time }) {
  time = new Date(time);
  const hour =
    ("0" + time.getHours()).slice(-2) +
    ":" +
    ("0" + time.getMinutes()).slice(-2);
  return (
    <div className="message received-message mr-auto ml-4 mt-3 ">
      <p className="my-auto">{message}</p>
      <p>{`${hour}`}</p>
    </div>
  );
}

export default ReveivedMessage;
