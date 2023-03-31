import { FETCH_LIST } from "../actions/types";

const initialState = [];

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIST:
      return action.payload;
    default:
      return state;
  }
};

export default listsReducer;
