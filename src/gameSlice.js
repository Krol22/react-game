import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { collisionCheck } from "./helpers/collisionCheck";

const getDirectionString = (moveDir) => {
  if (moveDir.x < 0) {
    return "LEFT";
  }

  if (moveDir.x > 0) {
    return "RIGHT";
  }

  if (moveDir.y < 0) {
    return "TOP";
  }

  if (moveDir.y > 0) {
    return "BOTTOM";
  }
};

const initialState = {
  tick: 0,
  map: [
    { x: 0, y: 0, type: 0 },
    { x: 1, y: 0, type: 0 },
    { x: 2, y: 0, type: 0 },
    { x: 3, y: 0, type: 0 },
    { x: 0, y: 1, type: 0 },
    { x: 1, y: 1, type: 1 },
    { x: 2, y: 1, type: 1 },
    { x: 3, y: 1, type: 0 },
    { x: 0, y: 2, type: 1 },
    { x: 1, y: 2, type: 0 },
    { x: 2, y: 2, type: 0 },
    { x: 3, y: 2, type: 0 },
    { x: 0, y: 3, type: 0 },
    { x: 1, y: 3, type: 0 },
    { x: 2, y: 3, type: 0 },
    { x: 3, y: 3, type: 0 },
  ],
  player: {
    x: 0,
    y: 0,
    state: "idle",
    weapon: "sword",
  },
};

export const movePlayer = createAsyncThunk(
  "game/movePlayer",
  (direction, { getState, dispatch, rejectWithValue }) => {
    const { player, map } = getState().game;

    if (player.state !== "idle") {
      return rejectWithValue(false);
    }

    const flipX = (direction.x > 0 || direction.y < 0) ? 1 : -1;

    const newPos = {
      x: player.x + (direction.x || 0),
      y: player.y + (direction.y || 0),
    };

    const collisionType = collisionCheck(map, newPos);

    if (collisionType === "MAP") {
      return rejectWithValue(false);
    }

    const moveDir = getDirectionString(direction);

    setTimeout(() => {
      dispatch(idle());
    }, 400);

    // XD Fix
    setTimeout(() => {
      dispatch(newPosition(newPos));
    }, 1);

    return {
      newPos,
      flipX,
      moveDir,
    };
  },
);

const gameSlice = createSlice({
  initialState,
  name: "game",
  reducers: {
    idle: (state) => {
      state.player.state = "idle";
    },
    newPosition: (state, { payload }) => {
      state.player.x = payload.x;
      state.player.y = payload.y;
    },
  },
  extraReducers: {
    [movePlayer.fulfilled]: (state, { payload }) => {
      state.player.flipX = payload.flipX;
      state.player.moveDir = payload.moveDir;
      state.player.state = "move";
    },
  }
});

export const {
  idle,
  newPosition,
} = gameSlice.actions;

export default gameSlice.reducer;
