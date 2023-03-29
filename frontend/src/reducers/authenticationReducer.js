import { AUTH_ERROR, AUTH_USER } from "../actions/types";

const initialState = {
  isAuth: false,
  token: null,
  error: '',
}

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {...state, isAuth: true, token: action.payload.token, error: "" };
    case AUTH_ERROR:
      return {...state, error: "Invalid Username or password"};
    default:
      return state;
  }
}

export default authenticationReducer;