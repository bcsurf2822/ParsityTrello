import { FETCH_BOARDS, POST_BOARDS, DELETE_BOARDS } from "../actions/boards";
import { DELETE_LIST } from "../actions/types";

const initialState = {
  boards: [],
  lists: []
};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOARDS:
      return { ...state, boards: action.payload };
    case POST_BOARDS:
      return {...state, boards: [...state.boards, action.payload]}
    case DELETE_BOARDS:
      return {...state, boards: state.boards.filter((board) => board._id !== action.payload)}
    case DELETE_LIST:
      return {...state,
      boards: state.boards.map(board => {
        if (board._id === action.payload.boardId) {
          return {
            ...board,
            lists: board.lists.filter(list => list._id !== action.payload.listId)
          };
        } else {
          return board;
        }
      })}
    default:
      return state;
  }
};

export default boardsReducer;