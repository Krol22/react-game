import { combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import gameSlice from "./gameSlice";

const createReducer = (injectedReducers = {}) => {
  return combineReducers({
    game: gameSlice,
    ...injectedReducers,
  });
};

const getMiddleware = () => {
  let middleware = [...getDefaultMiddleware()];

  if (process.env.NODE_ENV !== "production") {
    middleware = [...middleware];
  }

  return middleware;
};

export default configureStore({
  reducer: createReducer(),
  middleware: [...getMiddleware()],
  devTools: process.env.NODE_ENV !== "production",
});
