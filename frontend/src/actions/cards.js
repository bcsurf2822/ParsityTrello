import axios from "axios";
import { FETCH_COMMENTS } from "./types";

const useProxy = function (route) {
  return `http://localhost:8000${route}`;
};

export const fetchComments = (boardId, listId, cardId) => async (dispatch) => {
  try {
    const response = await axios.get(useProxy(`/boards/${boardId}/lists/${listId}/cards/${cardId}/comments`));

    if (response.status === 200) {
      dispatch({ type: FETCH_COMMENTS, payload: { cardId, comments: response.data } });
    } else {
      console.error("Error fetching comments:", response);
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};