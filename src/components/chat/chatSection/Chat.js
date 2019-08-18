import React from "react";
import Header from "./Header";
import Main from "./Main";
import InputForm from "./InputForm";

function Chat() {
  return (
    <div className="chat w-100 mr-2 d-flex flex-column">
      <Header />
      <Main />
      <InputForm />
    </div>
  );
}

export default Chat;
