const initialState = {
  user: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: state.user };

    default:
      return state;
  }
}
