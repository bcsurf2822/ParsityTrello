import { FETCH_COMMENTS } from "../actions/types";

const initialState = {};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return { ...state, [action.payload.cardId]: action.payload.comments };
    default:
      return state;
  }
};

export default commentsReducer;