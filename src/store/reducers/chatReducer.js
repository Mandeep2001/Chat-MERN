const initialState = {
  usersList: [],
  activeUser: null,
  socket: null,
  searchedUsers: null
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD_USERS":
      return { ...state, usersList: action.users };

    case "CHANGE_ACTIVE_USER":
      return { ...state, activeUser: action.selectedUser[0] };

    case "SEND_MESSAGE":
      const usersList = state.usersList.map(u => {
        if (u.user._id === state.activeUser[0].user._id)
          u.messages = [...state.activeUser[0].messages, action.msg];
        return u;
      });
      return {
        ...state,
        usersList
      };

    case "RECEIVE_MESSAGE":
      const users = state.usersList.map(u => {
        if (u.user._id === action.message.senderUserID) {
          u.messages = [
            ...u.messages,
            {
              _id: action.message._id,
              message: action.message.message,
              senderUserID: action.message.senderUserID,
              receiverUserID: action.message.receiverUserID,
              createdAt: action.message.createdAt
            }
          ];
        }
        return u;
      });
      return { ...state, usersList: [...users] };

    case "SET_SOCKET":
      return { ...state, socket: action.socket };

    case "SEARCH_USER":
      return { ...state, searchedUsers: action.users };

    default:
      return state;
  }
}
