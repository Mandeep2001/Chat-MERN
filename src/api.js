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

export const getMessages = userID => {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:5000/api/messages?userID=${userID}`)
      .then(data => resolve(data.data))
      .catch(error => reject(error));
  });
};
