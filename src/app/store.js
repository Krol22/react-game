import { combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const createReducer = (injectedReducers = {}) => {
  return combineReducers({ ...injectedReducers });
};

const getMiddleware = () => {
  let middleware = [...getDefaultMiddleware()];

  if (process.env.NODE_ENV !== "production") {
    // add development middleware inside the array
    middleware = [...middleware];
  }

  return middleware;
};

export default configureStore({
  reducer: createReducer(),
  middleware: [...getMiddleware()],
  devTools: process.env.NODE_ENV !== "production",
});
