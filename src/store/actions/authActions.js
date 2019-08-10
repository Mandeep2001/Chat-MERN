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
          if (responce.data.isSuccess) {
            dispatch({ type: "LOGIN", user: responce.data.user });
            resolve();
          } else {
            dispatch({ type: "LOGIN_ERROR", error: responce.data.error });
            reject(responce.data.error);
          }
        })
        .catch(error => {
          console.log("Errore:", error);
          console.log(error);
        });
    });
  };
};
