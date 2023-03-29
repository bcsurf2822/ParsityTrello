import axios from "axios";

export const logIn = (formProps, callback) => dispatch => {
  axios.post(
    "/login",
    formProps
  ).then(function (response) {
    dispatch({type: AUTH_USER, payload: response.data});
  })
}