import { createSlice } from "@reduxjs/toolkit";

import { collisionCheck } from "./helpers/collisionCheck";

const initialState = {
  tick: 0,
  map: [
    { x: 0, y: 0, type: "0" },
    { x: 1, y: 0, type: "0" },
    { x: 0, y: 1, type: "0" },
    { x: 1, y: 1, type: "0" },
  ],
  player: {
    x: 0,
    y: 0,
    state: "idle",
    weapon: "sword",
  },
};

const gameSlice = createSlice({
  initialState,
  name: "game",
  reducers: {
    movePlayer: (state, { payload }) => {
      state.player.flipX = (payload.x > 0 || payload.y < 0) ? 1 : -1;

      const newPos = {
        x: state.player.x + (payload.x || 0),
        y: state.player.y + (payload.y || 0),
      };

      const collisionType = collisionCheck(state.map, newPos);

      if (collisionType === "MAP") {
        return;
      }

      state.player = {
        ...state.player,
        ...newPos,
      };
    },
  },
});

export const {
  movePlayer,
} = gameSlice.actions;

export default gameSlice.reducer;
