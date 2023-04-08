import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";import thunk from "redux-thunk";
import authenticationReducer from "./authenticationReducer";
import boardsReducer from "./boardsReducer";
import listsReducer from "./listsReducer";
import cardsReducer from "./cardsReducer";
import commentsReducer from "./commentsReducer";
import descriptionReducer from "./descriptionReducer";

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  boards: boardsReducer,
  lists: listsReducer,
  cards: cardsReducer,
  comments: commentsReducer,
  descriptions: descriptionReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;