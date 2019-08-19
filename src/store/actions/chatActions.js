import { getUsersList } from "../../api";

export const loadUsersAction = () => {
  return (dispatch, getState) => {
    const state = getState();
    getUsersList()
      .then(res => {
        // Rimuovo l'utente corrente dalla lista
        const users = res.data.filter(user => user._id !== state.auth.user._id);
        dispatch({ type: "LOAD_USERS", users });
      })
      .catch(error => {
        console.log(error);
      });
  };
};
