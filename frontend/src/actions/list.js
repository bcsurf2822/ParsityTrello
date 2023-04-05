// import axios from "axios";
// import { POST_LIST } from "./types";

// const useProxy = function (route) {
//   return `http://localhost:8000${route}`;
// };


// export const postList = (title) => async (dispatch) => {
//   try {
//     const response = await axios.post(useProxy("/board/:boardId/lists"), {title});
//     console.log(response);
//     dispatch({type: POST_LIST, payload: response.data});
//   } catch (error) {
//     console.error("Unable to Post", error);
//   }
// };

