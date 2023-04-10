import { FETCH_CARDS, UPDATE_CARDS, POST_CARD, CLEAR_CARDS, DELETE_CARD } from "../actions/types";

const initialState = {};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARDS:
      return { ...state, [action.payload.listId]: action.payload.cards };
    case UPDATE_CARDS:
      return { ...state, [action.payload.listId]: action.payload.cards };
    case POST_CARD:
      return {
        ...state,
        [action.payload.listId]: [
          ...(state[action.payload.listId] || []),
          action.payload.card,
        ],
      };
    case DELETE_CARD:
      return {
        ...state, [action.payload.listId]: (state[action.payload.listId] || []).filter((card) => card._id !== action.payload.cardId),
      }
    default:
      return state;
  }
};

export default cardsReducer;