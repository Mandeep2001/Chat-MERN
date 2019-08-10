import axios from "axios";

export const loginAction = () => {
  return dispatch => {
    console.log(dispatch);
    axios
      .post("http://localhost:5000/login", {
        password: "Test1234",
        email: "prova6@test.it"
      })
      .then(res => {
        console.log(res);
      })
      .catch(res => {
        console.log(res);
      });
  };
};
