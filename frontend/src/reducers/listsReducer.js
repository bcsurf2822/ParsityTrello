import { FETCH_LIST, UPDATE_LISTS } from "../actions/types";

const initialState = [];

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIST:
      return action.payload;
    case UPDATE_LISTS:
      return {...state, list: [...state.list, action.payload.list]};
    default:
      return state;
  }
};

export default listsReducer;
