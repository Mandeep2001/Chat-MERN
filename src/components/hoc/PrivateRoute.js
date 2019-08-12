import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, isLogged, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isLogged ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
