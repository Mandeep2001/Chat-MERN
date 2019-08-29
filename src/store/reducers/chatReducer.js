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
        if (u.user._id === state.activeUser.user._id)
          u.messages = [...state.activeUser.messages, action.msg];
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

    case "CHANGE_MESSAGE_ID":
      const [...filteredArray] = state.usersList.filter(
        u => u.user._id === action.receiverUserID
      );
      filteredArray[0].messages.map(m => {
        if (m._id === action.temporaryId) m._id = action._id;
        return m;
      });
      const updatedList = state.usersList.map(u => {
        if (u.user._id === filteredArray[0].user._id) {
          u = filteredArray[0];
        }
        return u;
      });
      return { ...state, usersList: updatedList };

    case "DELETE_MESSAGE":
      return { ...state, usersList: action.list };

    default:
      return state;
  }
}
