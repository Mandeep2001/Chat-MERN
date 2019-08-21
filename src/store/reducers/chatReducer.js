const initialState = {
  usersList: [],
  activeUser: null,
  messages: null
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD_USERS":
      return { ...state, usersList: action.users };

    case "CHANGE_ACTIVE_USER":
      return { ...state, messages: null, activeUser: action.selectedUser };

    case "SET_MESSAGES_LIST":
      return { ...state, messages: action.res.messages };
    default:
      return state;
  }
}
