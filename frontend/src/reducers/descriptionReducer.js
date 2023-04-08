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
    case POST_DESCRIPTION: {
      const {listId, cardId, description} = action.payload;
      const list = state.lists.findIndex((list) => list._id === listId);
      const card = state.lists[list].cards.findIndex((card) => card._id === cardId);
      state.lists[list].cards[card].description = description;
      return {...state}
    }
    default:
      return state;
  }
};

export default descriptionReducer

