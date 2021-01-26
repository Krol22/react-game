import { createSlice } from "@reduxjs/toolkit";

const cameraSlice = createSlice({
  initialState: {
    x: 1,
    y: 1,
  },
  name: "camera",
  reducers: {
    changeCameraPosition: (state, { payload }) => {
      state.x = -payload.x;
      state.y = -payload.y;
    },
  },
});

export const {
  changeCameraPosition,
} = cameraSlice.actions;

export default cameraSlice.reducer;
