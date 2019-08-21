import { getUsersList, getMessages } from "../../api";

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

export const changeActiveUserAction = username => (dispatch, getState) => {
  const state = getState();
  const selectedUser = state.chat.usersList.filter(
    user => user.username === username
  );
  dispatch({ type: "CHANGE_ACTIVE_USER", selectedUser });
};

export const getMessagesAction = () => {
  return (dispatch, getState) => {
    const state = getState();
    // const userList = state.chat.usersList;
    getMessages(state.auth.user._id)
      .then(res => {
        // const messageList = res.messages;

        // for (let i = 0; i < messageList.length; i++) {
        //   const element = messageList[i];
        //   console.log(element.message);
        // }

        dispatch({ type: "SET_MESSAGES_LIST", res });
      })
      .catch(error => console.log(error));
  };
};
