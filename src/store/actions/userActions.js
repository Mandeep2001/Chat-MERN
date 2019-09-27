import axios from "axios";

export const updateUserAction = data => {
  return (dispatch, getState) => {
    const state = getState();
    const username = state.auth.user.username;
    axios
      .patch(`http://localhost:5000/${username}/update`, data)
      .then(res => console.log(res))
      .catch(error => console.log(error));
  };
}; 
