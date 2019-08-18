import { getUsersList } from "../../api";

export const loadUsersAction = () => {
  return dispatch => {
    getUsersList()
      .then(res => {
        dispatch({ type: "LOAD_USERS", users: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
};
