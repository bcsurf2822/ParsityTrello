import axios from "axios";
import {
  FETCH_LIST,
  UPDATE_LISTS,
  POST_LIST,
  DELETE_LIST
} from "./types";
import { fetchCards } from "./cards";

const useProxy = function (route) {
  return `http://localhost:8000${route}`;
};

// POST LIST
export const postList = (lists, boardId) => async (dispatch) => {
  try {
    const response = await axios.post(useProxy(`/board/${boardId}/lists`), {
      title: lists,
      boardId,
    });

    dispatch({
      type: POST_LIST,
      payload: response.data,
    });

    return response.data
  } catch (error) {
    console.error("Error Posting lists", error);
  }
};

// FETCH LIST
export const fetchList = (boardId) => async (dispatch) => {
  try {
    const response = await axios.get(useProxy(`/board/${boardId}/lists`));
    const listData = response.data.filter((list) => list !== null);

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

// Update list array in board schema
export const updateLists = (lists, boardId) => async (dispatch) => {
  try {
    console.log("updateLists action called:", lists);
    const response = await axios.patch(useProxy(`/boards/${boardId}/lists`), {
      lists,
      boardId,
    });

    console.log("API response:", response.data);

    dispatch({
      type: UPDATE_LISTS,
      payload: { lists: response.data.lists },
    });
  } catch (error) {
    console.error("Error updating lists", error);
  }
};

//DELETE LIST
export const deleteList = (listId, boardId) => async (dispatch) => {
  try {
    const response = await axios.delete(
      useProxy(`/board/${boardId}/lists/${listId}`)
    );

    const list = response.data

    dispatch({ type: DELETE_LIST, payload: list });
  } catch (error) {
    console.error(error);
  }
};