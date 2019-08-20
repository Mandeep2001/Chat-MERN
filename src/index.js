import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import io from "socket.io-client";
import jwt from "jwt-decode";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers/rootReducer";
import "./index.css";

// Store che contiene lo stato dell'intera applicazione
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

if (localStorage.chatJWT) {
  const { _id, email, username, profileImageURL } = jwt(localStorage.chatJWT);
  const user = {
    token: localStorage.chatJWT,
    _id,
    username,
    email,
    profileImageURL
  };
  store.dispatch({ type: "LOGIN", user });
}

const socket = io("http://localhost:5000");
// const socket = io.connect("http://localhost:5000");

// socket.on("connect", () => {
//   console.log("connected");
// });

ReactDOM.render(
  // Passo lo store al provider che si occupa di collegarlo all'app
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
