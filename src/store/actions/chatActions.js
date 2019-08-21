import { getUsersList } from "../../api";

export const loadUsersAction = () => {
  return (dispatch, getState) => {
    const state = getState();
    getUsersList(state.auth.user._id)
      .then(res => {
        // Rimuovo l'utente corrente dalla lista
        const users = res.data.users.filter(
          user => user.user._id !== state.auth.user._id
        );
        dispatch({ type: "LOAD_USERS", users });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const changeActiveUserAction = username => (dispatch, getState) => {
  const state = getState();
  const selectedUser = state.chat.usersList.filter(
    ({ user }) => user.username === username
  );
  dispatch({ type: "CHANGE_ACTIVE_USER", selectedUser });
};
