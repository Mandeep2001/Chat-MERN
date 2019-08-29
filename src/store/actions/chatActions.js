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
  const _id = uuid();
  const msg = {
    _id,
    message,
    senderUserID: state.auth.user._id,
    receiverUserID: state.chat.activeUser.user._id,
    createdAt: Date.now()
  };
  state.chat.socket.emit("send_message", msg);
  dispatch({ type: "SEND_MESSAGE", msg });
};

export const changeMessageIdAction = message => dispatch => {
  dispatch({
    type: "CHANGE_MESSAGE_ID",
    temporaryId: message.temporaryId,
    _id: message.res._id,
    receiverUserID: message.receiverUserID
  });
};

export const receiveMessageAction = message => dispatch => {
  dispatch({ type: "RECEIVE_MESSAGE", message });
};

export const setSocketAction = socket => dispatch => {
  dispatch({ type: "SET_SOCKET", socket });
};

export const searchUserAction = users => dispatch => {
  dispatch({ type: "SEARCH_USER", users });
};

export const deleteMessageAction = message => (dispatch, getState) => {
  const state = getState();
  state.chat.socket.emit("delete_message", message);

  const list = state.chat.usersList.map(u => {
    u.messages = u.messages.filter(m => m._id !== message._id);
    return u;
  });

  dispatch({ type: "DELETE_MESSAGE", list });
};
