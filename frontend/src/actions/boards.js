import axios from "axios";
import {
  FETCH_BOARDS,
  POST_BOARDS,
  DELETE_BOARDS,
  FETCH_BOARDID
} from "./types";

const useProxy = function (route) {
  return `http://localhost:8000${route}`;
};

export const postBoards = (title, userId) => async (dispatch) => {
  try {
    const response = await axios.post(useProxy("/boards"), { title, userId });

    dispatch({ type: POST_BOARDS, payload: response.data });
  } catch (error) {
    console.error("Unable to Post", error);
  }
};

// New fetch boards by userId
export const fetchBoards = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(useProxy(`/user/${userId}/boards`));

    dispatch({ type: FETCH_BOARDS, payload: response.data.boards });
  } catch (error) {
    console.error("Error fetching boards:", error);
  }
};

export const deleteBoard = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(useProxy(`/boards/${id}`))

    dispatch({type: DELETE_BOARDS, payload: id})
  } catch (error) {
    console.error("Unable to delete board");
  }
};

export const fetchBoardId = (id) => async (dispatch) => {
  try {
    const response = await axios.get(useProxy(`/board/${id}`))

    dispatch({type: FETCH_BOARDID, payload: response.data})
  } catch (error) {
    console.error("Unable to Fetch Board By ID!")
  }
}