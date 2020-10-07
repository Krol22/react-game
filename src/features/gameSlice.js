import { createSlice } from "@reduxjs/toolkit";

export const playerStates = {
  IDLE: "IDLE",
  MOVE: "MOVE",
  HIT_WALL: "HIT_WALL",
};

const tickMoves = [
  {x: 0, y: -1},
  {x: 0, y: 1},
];

const initialState = {
  tick: 0,
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
  enemies: [
    {
      state: "IDLE",
      id: 0,
      x: -1, 
      y: -1,
    },
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
    moveUp: (state) => {
      state.player.flip = 1;
      if (state.player.y === -1) {
        state.player.playerState = playerStates.HIT_WALL;
        state.shouldTick = true;
        return;
      }

      state.player.y -= 1;
      state.player.playerState = playerStates.MOVE;
      state.shouldTick = true;
    },
    moveDown: (state) => {
      state.player.flip = -1;
      if (state.player.y === 2) {
        state.player.playerState = playerStates.HIT_WALL;
        state.shouldTick = true;
        return;
      }

      state.player.y += 1;
      state.player.playerState = playerStates.MOVE;
      state.shouldTick = true;
    },
    moveLeft: (state) => {
      state.player.flip = -1;
      if (state.player.x === -1) {
        state.player.playerState = playerStates.HIT_WALL;
        state.shouldTick = true;
        return;
      }

      state.player.x -= 1;
      state.player.playerState = playerStates.MOVE;
      state.shouldTick = true;
    },
    moveRight: (state) => {
      state.player.flip = 1;
      if (state.player.x === 2) {
        state.player.playerState = playerStates.HIT_WALL;
        state.shouldTick = true;
        return;
      }

      state.player.x += 1;
      state.player.playerState = playerStates.MOVE;
      state.shouldTick = true;
    },
    idle: (state) => {
      state.player.playerState = playerStates.IDLE;
    },
    tick: (state) => {
      state.tick += 1;
      // state.enemies[0].x += tickMoves[state.tick].x;
      // state.enemies[0].y += tickMoves[state.tick].y;
      // state.enemies[0].state = "MOVE";
//
      // if (state.tick >= 3) {
        // state.tick = 0;
      // } else {
        // state.tick += 1;
      // }
    },
    endTick: (state) => {
      state.shouldTick = false;
    },
    changeState: ({ enemies }, payload) => {
      enemies[0].state = payload;
    },
    move: (state) => {
      state.enemies[0].x += tickMoves[state.tick % 2].x;
      state.enemies[0].y += tickMoves[state.tick % 2].y;
      state.enemies[0].state = "MOVE";
    },
  }
});

export const {
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  idle,
  move,
  tick,
  endTick,
  changeState,
} = playerSlice.actions;

export default playerSlice.reducer;
