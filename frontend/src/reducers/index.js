import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authenticationReducer from "./authenticationReducer";
import boardsReducer from "./boardsReducer";
import listsReducer from "./listsReducer";
import cardsReducer from "./cardsReducer";

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  boards: boardsReducer,
  lists: listsReducer,
  cards: cardsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;