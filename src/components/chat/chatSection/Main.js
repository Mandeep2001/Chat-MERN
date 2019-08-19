import React from "react";
import SendedMessage from "./SendedMessage";
import ReceivedMessage from "./ReceivedMessage";

function Main() {
  return (
    <div className="d-flex flex-column flex-grow-1 h-100">
      <SendedMessage message={"Messaggio inviato"} />
      <ReceivedMessage message={"Messaggio ricevuto"} />
    </div>
  );
}

export default Main;
