import axios from "axios";

export const getUsersList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:5000/api/users")
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
