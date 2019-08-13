const initialState = {
  user: null,
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
      return { ...state, loginError: action.error, user: null };
    case "REGISTER":
      return state;
    case "REGISTER_ERROR":
      return { ...state, registerError: action.error };

    default:
      return state;
  }
}
