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
      const { x, y } = payload;
      const { tiles } = state;

      tiles[y][x].entityId = null;
    },
    updateMapState: (state, { payload }) => {
      state.tiles = payload;
    },
    spawnEntity: (state, { payload }) => {
      const { tiles } = state;
      const { position, entityId } = payload;

      tiles[position.y][position.x].entityId = entityId;
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
  spawnEntity,
} = mapSlice.actions;

export default mapSlice.reducer;
