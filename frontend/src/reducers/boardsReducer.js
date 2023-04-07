import { FETCH_BOARDS, POST_BOARDS, DELETE_BOARDS } from "../actions/boards";
import { FETCH_BOARDID } from "../actions/types";


const initialState = {
  boards: [],
};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOARDS:
      return { ...state, boards: action.payload };
    case FETCH_BOARDID:
      return {...state, boards: {...state.boards, [action.payload._id]: action.payload}}
    case POST_BOARDS:
      return {...state, boards: [...state.boards, action.payload]}
    case DELETE_BOARDS:
      return {...state, boards: state.boards.filter((board) => board._id !== action.payload)}
    default:
      return state;
  }
};

export default boardsReducer;