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

export const getMessages = userID => {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:5000/api/messages?userID=${userID}`)
      .then(data => resolve(data.data))
      .catch(error => reject(error));
  });
};
