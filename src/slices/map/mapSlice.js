import { createSlice } from "@reduxjs/toolkit";

import { loadLevel } from "../../gameSlice";

const mapSlice = createSlice({
  name: "map",
  initialState: {
    tiles: [], 
  },
  reducers: {
    moveEntityOnMap: (state, { payload }) => {
      const { newPosition, oldPosition, entityId } = payload;
      const { tiles } = state;

      tiles[oldPosition.y][oldPosition.x].entityId = null;
      tiles[newPosition.y][newPosition.x].entityId = entityId;
    },
    removeEntityFromMap: (state, { payload }) => {
      const { position } = payload;
      const { tiles } = state;

      tiles[position.y][position.x].entityId = null;
    },
    updateMapState: (state, { payload }) => {
      state.tiles = payload;
    },
  },
  extraReducers: {
    [loadLevel.fulfilled]: (state, { payload }) => {
      const { map } = payload;

      state.tiles = map.tiles;
    },
  },
});

export const {
  updateMapState,
  moveEntityOnMap,
  removeEntityFromMap,
} = mapSlice.actions;

export default mapSlice.reducer;
