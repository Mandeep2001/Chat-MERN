import { getUsersList } from "../../api";
import uuid from "uuid/v1";

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

export const sendMessageAction = message => (dispatch, getState) => {
  const state = getState();
  const msg = {
    _id: uuid(),
    message,
    senderUserID: state.auth.user._id,
    receiverUserID: state.chat.activeUser[0].user._id,
    createdAt: Date.now()
  };
  state.chat.socket.emit("send_message", msg);
  dispatch({ type: "SEND_MESSAGE", msg });
};

export const setSocketAction = socket => dispatch => {
  dispatch({ type: "SET_SOCKET", socket });
};
