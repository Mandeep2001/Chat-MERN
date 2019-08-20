const initialState = {
  usersList: [],
  activeUser: null
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD_USERS":
      return { ...state, usersList: action.users };

    case "CHANGE_ACTIVE_USER":
      return { ...state, activeUser: action.selectedUser };
    default:
      return state;
  }
}
