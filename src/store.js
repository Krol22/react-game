import {combineReducers} from "redux";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";

import gameSlice from "./gameSlice";
import inputSlice from "./inputSlice";
import cameraSlice from "./slices/camera/cameraSlice";
import mapSlice from "./slices/map/mapSlice";
import uiSlice from "./slices/ui/uiSlice";

const createReducer = (injectedReducers = {}) => {
  return combineReducers({
    game: gameSlice,
    input: inputSlice,
    camera: cameraSlice,
    ui: uiSlice,
    map: mapSlice,
    ...injectedReducers,
  });
};

export default configureStore({
  reducer: createReducer(),
  devTools: process.env.NODE_ENV !== "production",
});
