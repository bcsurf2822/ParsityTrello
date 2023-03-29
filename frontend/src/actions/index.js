import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from "./types";


export const logIn = (formProps, callback) => dispatch => {
  axios.post(
    "/login",
    formProps
  ).then(function (response) {
    dispatch({type: AUTH_USER, payload: response.data});
    localStorage.setItem("token", response.data.token);
    callback();
  })
  .catch(function (error) {
    dispatch({type: AUTH_ERROR, payload: error})
  })
};

export const fetchUser = () => dispatch => {
  const config = {
    headers: {
      Authroization: "Bearer" + localStorage.getItem("token"),
    }
  };

  axios.get(
    "/currentUser", 
    config
  ).then(function (response) {
    dispatch({type: AUTH_USER, payload: response.data});
    localStorage.setItem("token", response.data.token);
  })
  .catch(function (error) {
    console.log(error);
  })
}