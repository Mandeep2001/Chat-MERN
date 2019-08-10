const initialState = {
  user: null,
  loginError: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.user };
    case "LOGIN_ERROR":
      return { ...state, loginError: action.error };

    default:
      return state;
  }
}
