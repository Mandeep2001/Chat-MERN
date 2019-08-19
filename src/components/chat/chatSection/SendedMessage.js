import React from "react";

function SendedMessage({ message }) {
  return (
    <div className="message sended-message ml-auto mr-4 mt-3 ">
      <p className="my-auto">{message}</p>
    </div>
  );
}

export default SendedMessage;
