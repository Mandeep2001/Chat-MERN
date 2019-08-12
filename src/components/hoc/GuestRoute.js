import React from "react";
import { Route, Redirect } from "react-router-dom";

function GuestRoute({ component: Component, isLogged, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !isLogged ? <Component {...props} /> : <Redirect to="/chat" />
      }
    />
  );
}

export default GuestRoute;
