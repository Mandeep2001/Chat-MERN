import axios from "axios";

export const getUsersList = _id => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/users", { userID: _id })
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};
