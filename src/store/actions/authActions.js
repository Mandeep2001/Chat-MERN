import axios from "axios";

export const loginAction = user => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:5000/login", {
          email: user.email,
          password: user.password
        })
        .then(responce => {
          if (responce.data.error) {
            dispatch({ type: "LOGIN_ERROR", error: responce.data.error });
            reject(responce.data.error);
          } else {
            localStorage.chatJWT = responce.data.user.token;
            dispatch({
              type: "LOGIN",
              user: responce.data.user
            });
            resolve();
          }
        })
        .catch(error => {
          // TODO: gestire errore
          console.log("Errore", error);
          dispatch({ type: "LOGIN_ERROR", error: error });
          reject(error);
        });
    });
  };
};

export const registerAction = user => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:5000/register", {
          name: user.name,
          username: user.username,
          email: user.email,
          password: user.password
        })
        .then(responce => {
          if (responce.data.isSuccess) {
            dispatch({
              type: "REGISTER",
              user: responce.data.user
            });
            resolve();
          } else {
            dispatch({ type: "REGISTER_ERROR", error: responce.data.error });
            reject(responce.data.error);
          }
        })
        .catch(error => {
          // TODO: gestire errore
          console.log("Errore:", error);
          console.log(error);
        });
    });
  };
};

export const logoutAction = user => {
  localStorage.removeItem("chatJWT");
  return {
    type: "LOGOUT"
  };
};
