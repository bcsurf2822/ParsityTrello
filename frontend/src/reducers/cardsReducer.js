import { FETCH_CARDS, UPDATE_CARDS } from "../actions/types";

const initialState = {};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARDS:
      return { ...state, [action.payload.listId]: action.payload.cards };
    case UPDATE_CARDS:
      return { ...state, [action.payload.listId]: action.payload.cards };  
    default:
      return state;
  }
};

export default cardsReducer;