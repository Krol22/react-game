import { createSlice } from "@reduxjs/toolkit";

import { ENTITY_TYPE } from "../../constants";
import { loadLevel } from "../../gameSlice";

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
  extraReducers: {
    [loadLevel.fulfilled]: (state, { payload }) => {
      const player = Object.values(payload.entities).find(({ entityType }) => entityType === ENTITY_TYPE.PLAYER);

      state.x = -player.x;
      state.y = -player.y;
    }
  }
});

export const {
  changeCameraPosition,
} = cameraSlice.actions;

export default cameraSlice.reducer;
