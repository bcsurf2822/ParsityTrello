import { AUTH_ERROR, AUTH_USER } from "../actions/types";

const initialState = {
  username: "",
  authorized: localStorage.getItem("token") || "", 
  id: "",
}

// Having issues with trying updating initial state, console.log is working so not sure what's up...

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      console.log(action.payload)
      console.log(action.payload.username.user)
      return {...state, username: action.payload.username.user, authorized: action.payload.token, id: action.payload.username._id};
    case AUTH_ERROR:
      return {...state, error: action.payload};
    default:
      return state;
  }
}

export default authenticationReducer;

/*
const initialState = {
  username: null,
  authorized: localStorage.getItem("token") || "", 
  id: null,
  error: '',
}
*/