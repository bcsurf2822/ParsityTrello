import { AUTH_ERROR, AUTH_USER } from "../actions/types";

const initialState = {
  username: null,
  authorized: localStorage.getItem("token") || "", 
  token: null,
  error: '',
}

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {...state, authorized: action.payload.token, username: action.payload.username || null, error: "" };
    case AUTH_ERROR:
      return {...state, error: action.payload};
    default:
      return state;
  }
}

export default authenticationReducer;