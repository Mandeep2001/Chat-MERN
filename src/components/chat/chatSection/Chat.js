import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Main from "./Main";
import InputForm from "./InputForm";

function Chat({ activeUser }) {
  let main = null;

  if (activeUser) main = <Main />;
  else main = <div className="d-flex flex-column flex-grow-1 h-100" />;

  return (
    <div className="chat w-100 mr-2 d-flex flex-column">
      <Header />
      {main}
      <InputForm />
    </div>
  );
}

const mapStateToProps = state => {
  return { activeUser: state.chat.activeUser };
};

export default connect(mapStateToProps)(Chat);
