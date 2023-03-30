import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from "./types";

const useProxy = function (route) {
  return `http://localhost:8000${route}`
}

//Logs in User in coordination with our post Login Route
export const logIn = (formProps, callback) => dispatch => {
  axios.post(
    useProxy("/login"),
    formProps
  ).then(function (response) {
    dispatch({type: AUTH_USER, payload: response.data});
    localStorage.setItem("token", response.data.token);
    console.log("API RES", response.data.token)
    callback();
  })
  .catch(function (error) {
    dispatch({type: AUTH_ERROR, payload: error})
  })
};

export const fetchAuthorized = () => dispatch => {
  const config = {
    headers: {
      Authorization: "Bearer" + localStorage.getItem("token")
    }
  };

  axios.get(
    useProxy("/authorized"),
    config
    ).then(function (response) {
      dispatch({type: AUTH_USER, payload: response.data});
      localStorage.setItem("token", response.data.token)
    })
    .catch(function (error) {
      console.log(error)
    })
}