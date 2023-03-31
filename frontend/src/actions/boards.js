import axios from "axios";

export const FETCH_BOARDS = "fetch_boards";

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