import React from "react";
import { Link } from "react-router-dom";
import User from "./User";

function UserList() {
  return (
    <div className="user-list h-100 flex-grow-1 d-flex flex-column">
      <Link className="user-list-link">
        <User user={{ name: "Mark Zuckerberg", isActive: true }} />
      </Link>
      <Link className="user-list-link">
        <User user={{ name: "Bill Gates", isActive: false }} />
      </Link>
      <Link className="user-list-link">
        <User user={{ name: "Steve Jobs", isActive: false }} />
      </Link>
    </div>
  );
}

export default UserList;
