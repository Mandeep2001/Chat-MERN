const initialState = {
  user: { token: null },
  loginError: null,
  registerError: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.user,
        loginError: null
      };
    case "LOGIN_ERROR":
      return { ...state, loginError: action.error, user: { token: null } };
    case "REGISTER":
      return { ...state, registerError: null, user: action.user };
    case "REGISTER_ERROR":
      return { ...state, registerError: action.error, user: { token: null } };
    case "LOGOUT":
      return {};

    default:
      return state;
  }
}
