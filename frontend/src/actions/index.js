import axios from "axios";
import { AUTH_USER, AUTH_ERROR, FETCH_LIST, FETCH_CARDS, UPDATE_LISTS, UPDATE_CARDS } from "./types";

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
  .catch(function () {
    dispatch({type: AUTH_ERROR, payload: alert("Unauthorized Username or Password")})
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
    //console.log("Fetched lists:", listData);
    dispatch({
      type: FETCH_LIST,
      payload: listData,
    });

    // Fetch the cards for each list
    listData.forEach((list) => {
      dispatch(fetchCards(boardId, list._id));
    });
  } catch (error) {
    console.error("Error fetching lists data", error);
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
    console.error("Error fetching cards", error);
  }
};

// update lists
export const updateLists = (lists, boardId) => async (dispatch) => {
  try {
    const response = await axios.patch(useProxy(`/boards/${boardId}/lists`), {lists, boardId})

    dispatch({
      type: UPDATE_LISTS,
      payload: { lists: response.data.list },
    });
  } catch (error) {
    console.error("Error updating lists", error)
  }
} 

// TODO: update cards
export const updateCards = (listId, cards) => async (dispatch) => {
  try {
    const response = await axios.patch(useProxy(`/lists/${listId}/cards`), {cards})

    console.log(response);

    dispatch({
      type: UPDATE_CARDS,
      payload: { cards: response.data.cards },
    });
  } catch (error) {
    console.error("Error updating cards", error)
  }
} ;

//POST LIST
