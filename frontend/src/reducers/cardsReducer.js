import { FETCH_CARD } from "../actions/types";

const initialState = [];

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARD:
      //console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default cardsReducer;