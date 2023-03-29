import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authenticationReducer from "./authenticationReducer";

const rootReducer = combineReducers({
  authentication: authenticationReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;