import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware"; // Import redux-promise-middleware
import moviesReducer from "../reducers/movieReducer";

const rootReducer = combineReducers({
  movies: moviesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(promiseMiddleware))
);

export default store;
