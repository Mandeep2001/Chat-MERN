import React from "react";
import Navbar from "./components/layout/navbar/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/hoc/PrivateRoute";
import GuestRoute from "./components/hoc/GuestRoute";
import { connect } from "react-redux";
import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProfileDetails from "./components/user/ProfileDetails";

function App(props) {
  return (
    <BrowserRouter>
      <div className="App h-100 d-flex flex-column">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <GuestRoute exact path="/login" component={Login} />
          <GuestRoute exact path="/register" component={Register} />
          <PrivateRoute
            exact
            path="/:username"
            isLogged={props.isLogged}
            component={ProfileDetails}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return { isLogged: !!state.auth.user.token };
};

export default connect(mapStateToProps)(App);
