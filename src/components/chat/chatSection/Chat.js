import React, { useEffect } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Main from "./Main";
import InputForm from "./InputForm";
import { loadUsersAction } from "../../../store/actions/chatActions";

function Chat({ loadUsers }) {
  useEffect(() => {
    loadUsers();
  });

  return (
    <div className="chat w-100 mr-2 d-flex flex-column">
      <Header />
      <Main />
      <InputForm />
    </div>
  );
}

export default connect(
  null,
  { loadUsers: loadUsersAction }
)(Chat);
