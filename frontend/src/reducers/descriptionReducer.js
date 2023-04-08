import { POST_DESCRIPTION } from "../actions/types";

const initialState = {};

const descriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    // case POST_DESCRIPTION:
    //   return {...state, [action.payload.cardId]: [
    //     action.payload.description,
    //     ...(state[action.payload.cardId] || [])
    //   ],
    // };
    case POST_DESCRIPTION:
      return {
        ...state,
        [action.payload.listId]: [
          ...(state[action.payload.listId] || []),
          action.payload.card,
        ],
      };
    default:
      return state;
  }
};

export default descriptionReducer

