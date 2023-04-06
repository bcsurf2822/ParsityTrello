import { FETCH_LIST, UPDATE_LISTS, POST_LIST, DELETE_LIST, CLEAR_LIST } from "../actions/types";

const initialState = {
  list: [],
};

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIST:
      return {...state, list: action.payload};
    case UPDATE_LISTS:
      return { ...state, list: action.payload.lists };
    case POST_LIST:
      return {...state, list: [...state.list, action.payload]}
    case DELETE_LIST:
      return {...state, list: state.list.filter((list) => list._id !== action.payload)}
    case CLEAR_LIST:
      return {}
    default:
      return state;
  }
};

export default listsReducer;
