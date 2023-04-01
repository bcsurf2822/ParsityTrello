import axios from "axios";

export const FETCH_BOARDS = "fetch_boards";
export const POST_BOARDS = "post_boards";
export const DELETE_BOARDS = "delete_boards";

const useProxy = function (route) {
  return `http://localhost:8000${route}`;
};

export const fetchBoards = () => async (dispatch) => {
  try {
    const response = await axios.get(useProxy("/boards"));
    dispatch({ type: FETCH_BOARDS, payload: response.data.results });
  } catch (error) {
    console.error("Error fetching boards:", error);
  }
};

export const postBoards = (title) => async (dispatch) => {
  try {
    const response = await axios.post(useProxy("/boards"), {title});
    console.log(response);
    dispatch({type: POST_BOARDS, payload: response.data});
  } catch (error) {
    console.error("Unable to Post", error);
  }
};

export const deleteBoard = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(useProxy(`/boards/${id}`))
    console.log(response);
    dispatch({type: DELETE_BOARDS, payload: id})
  } catch (error) {
    console.error("Unable to delete board");
  }
}