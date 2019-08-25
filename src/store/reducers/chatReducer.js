const initialState = {
  usersList: [],
  activeUser: null,
  socket: null
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD_USERS":
      return { ...state, usersList: action.users };

    case "CHANGE_ACTIVE_USER":
      return { ...state, activeUser: action.selectedUser };

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

    case "SET_SOCKET":
      return { ...state, socket: action.socket };

    default:
      return state;
  }
}
