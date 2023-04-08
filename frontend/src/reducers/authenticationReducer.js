import { AUTH_ERROR, AUTH_USER } from "../actions/types";

const initialState = {
  username: "",
  authorized: localStorage.getItem("token") || "", 
  id: localStorage.getItem("id") || "",
}

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {...state, username: action.payload.username.user, authorized: action.payload.token, id: action.payload.username._id};
    case AUTH_ERROR:
      return {...state, error: action.payload};
    default:
      return state;
  }
}

export default authenticationReducer;