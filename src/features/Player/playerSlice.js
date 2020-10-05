import { createSlice } from "@reduxjs/toolkit";

export const playerStates = {
  IDLE: "IDLE",
  MOVE: "MOVE",
  HIT_WALL: "HIT_WALL",
};

const initialState = {
  x: 1,
  y: 1,
  flip: 1,
  playerState: playerStates.IDLE,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    moveUp: (state) => {
      state.flip = 1;
      if (state.y === -1) {
        state.playerState = playerStates.HIT_WALL;
        return;
      }

      state.y -= 1;
      state.playerState = playerStates.MOVE;
    },
    moveDown: (state) => {
      state.flip = -1;
      if (state.y === 2) {
        state.playerState = playerStates.HIT_WALL;
        return;
      }

      state.y += 1;
      state.playerState = playerStates.MOVE;
    },
    moveLeft: (state) => {
      state.flip = -1;
      if (state.x === -1) {
        state.playerState = playerStates.HIT_WALL;
        return;
      }

      state.x -= 1;
      state.playerState = playerStates.MOVE;
    },
    moveRight: (state) => {
      state.flip = 1;
      if (state.x === 2) {
        state.playerState = playerStates.HIT_WALL;
        return;
      }

      state.x += 1;
      state.playerState = playerStates.MOVE;
    },
    idle: (state) => {
      state.playerState = playerStates.IDLE;
    }
  }
});

export const {
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  idle,
} = playerSlice.actions;

export default playerSlice.reducer;
