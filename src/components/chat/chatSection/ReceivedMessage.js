import React from "react";

function ReveivedMessage({ message }) {
  return (
    <div className="message sended-message mr-auto ml-4 mt-3 ">
      <p className="my-auto">{message}</p>
    </div>
  );
}

export default ReveivedMessage;
