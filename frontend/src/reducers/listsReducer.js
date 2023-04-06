import { FETCH_LIST, UPDATE_LISTS, POST_LIST } from "../actions/types";

const initialState = {
  list: [],
};

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIST:
      return {...state, list: action.payload};
    case UPDATE_LISTS:
      return action.payload.lists;
    case POST_LIST:
      return {...state, list: [...state.list, action.payload]}
    default:
      return state;
  }
};

export default listsReducer;
