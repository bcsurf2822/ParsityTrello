import axios from "axios";
import { AUTH_USER, AUTH_ERROR, FETCH_LIST, DELETE_LIST } from "./types";

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

  //Protected Endpoint use
  axios.get(
    useProxy("/authorized"),
    config
    ).then(function (response) {
      dispatch({type: AUTH_USER, payload: response.data});
      localStorage.setItem("token", response.data.token)
      console.log("Get Auth User", response)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export const fetchList = (boardId) => async (dispatch) => {
  try {
    const response = await axios.get(useProxy(`/board/${boardId}/lists`));
    const listData = response.data;
    console.log(response);
    dispatch({ type: FETCH_LIST, payload: listData });
  } catch (error) {
    console.error("Error fetching lists data", error);
  }
};

export const deleteList = (boardId, listId) => async (dispatch) => {
  try {
    const response = await axios.delete(useProxy(`/board/${boardId}/lists/${listId}`));
    const listData = response.data;
    console.log(listData);
    dispatch({type: DELETE_LIST, payload: {boardId, listId}});
  } catch (error) {
    console.error("Error Deleting List", error);
  }
}