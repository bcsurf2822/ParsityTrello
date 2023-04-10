import axios from "axios";
import {
  AUTH_USER,
  AUTH_ERROR,
} from "./types";

const useProxy = function (route) {
  return `http://localhost:8000${route}`;
};

//Logs in User in coordination with our post Login Route
export const logIn = (formProps, callback) => (dispatch) => {
  axios
    .post(useProxy("/login"), formProps)
    .then(function (response) {
      // console.log("logIn:", response);
      dispatch({ type: AUTH_USER, payload: response.data });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);
      callback(response.data.id);
      console.log("After logIn:", response.data.id);
    })
    .catch(function () {
      dispatch({
        type: AUTH_ERROR,
        payload: alert("Unauthorized Username or Password"),
      });
    });
};

export const fetchAuthorized = () => (dispatch) => {
  const config = {
    headers: {
      Authorization: "Bearer" + localStorage.getItem("token"),
    },
  };

  //Protected Endpoint use
  axios
    .get(useProxy("/authorized"), config)
    .then(function (response) {
      dispatch({ type: AUTH_USER, payload: response.data });
      localStorage.setItem("token", response.data.token);
    })
    .catch(function (error) {
      console.log(error);
    });
};