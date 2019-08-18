const initialState = {
  usersList: []
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD_USERS":
      return { ...state, usersList: action.users };

    default:
      return state;
  }
}
