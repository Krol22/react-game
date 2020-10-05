import { createSlice } from "@reduxjs/toolkit";

export const playerStates = {
  IDLE: "IDLE",
  MOVE: "MOVE",
  HIT_WALL: "HIT_WALL",
};

const initialState = {
  map: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 0, y: 3 },
    { x: 1, y: 3 },
    { x: 2, y: 3 },
    { x: 3, y: 3 },
  ],
  player: {
    x: 1,
    y: 1,
    flip: 1,
    playerState: playerStates.IDLE,
  }
};

const playerSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    moveUp: ({ player }) => {
      player.flip = 1;
      if (player.y === -1) {
        player.playerState = playerStates.HIT_WALL;
        return;
      }

      player.y -= 1;
      player.playerState = playerStates.MOVE;
    },
    moveDown: ({ player }) => {
      player.flip = -1;
      if (player.y === 2) {
        player.playerState = playerStates.HIT_WALL;
        return;
      }

      player.y += 1;
      player.playerState = playerStates.MOVE;
    },
    moveLeft: ({ player }) => {
      player.flip = -1;
      if (player.x === -1) {
        player.playerState = playerStates.HIT_WALL;
        return;
      }

      player.x -= 1;
      player.playerState = playerStates.MOVE;
    },
    moveRight: ({ player }) => {
      player.flip = 1;
      if (player.x === 2) {
        player.playerState = playerStates.HIT_WALL;
        return;
      }

      player.x += 1;
      player.playerState = playerStates.MOVE;
    },
    idle: ({ player }) => {
      player.playerState = playerStates.IDLE;
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
