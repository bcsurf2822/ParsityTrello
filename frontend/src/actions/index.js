import axios from "axios";
import { AUTH_USER, AUTH_ERROR, FETCH_LIST, FETCH_CARDS } from "./types";

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

export const fetchList = (id) => async (dispatch) => {
  try {
    const response = await axios.get(useProxy(`/board/${id}/lists`));
    const lists = response.data;
    console.log("Fetched lists:", lists);
    dispatch({
      type: FETCH_LIST,
      payload: lists,
    });

    // Fetch the cards for each list
    lists.forEach((list) => {
      dispatch(fetchCards(id, list._id));
    });
  } catch (error) {
    console.log("Error fetching lists:", error);
  }
};

// fetch cards
export const fetchCards = (boardId, listId) => async (dispatch) => {
  try {
    const response = await axios.get(useProxy(`/board/${boardId}/lists/${listId}`));
    dispatch({
      type: FETCH_CARDS,
      payload: { listId, cards: response.data.cards },
    });
  } catch (error) {
    console.log("Error fetching cards:", error);
  }
};