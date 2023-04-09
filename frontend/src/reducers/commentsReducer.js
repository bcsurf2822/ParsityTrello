// import { FETCH_COMMENTS, POST_COMMENT } from "../actions/types";

// const initialState = {};

// const commentsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_COMMENTS:
//       return { ...state, [action.payload.cardId]: action.payload.comments };
//     case POST_COMMENT: // Add this case
//       return {
//         ...state,
//         [action.payload.cardId]: [
//           action.payload.comment,
//           ...(state[action.payload.cardId] || []),
//         ],
//       };
//     default:
//       return state;
//   }
// };

// export default commentsReducer;