import { createSlice } from "@reduxjs/toolkit";

const generateInitialState = () => {
  const keys = {};

  for (let i = 8; i < 222; i++) {
    keys[i] = {
      isDown: false,
      isPressed: false,
    };
  }

  return {
    keys,
  };
}

const inputSlice = createSlice({
  initialState: generateInitialState(),
  name: "input",
  reducers: {
    keyDown: (state, { payload }) => {
      if (!state.keys[payload]) {
        return;
      }

      if (state.keys[payload].isDown) {
        state.keys[payload].isPressed = true;
        return;
      }
      state.keys[payload].isDown = true;
    },
    keyUp: (state, { payload }) => {
      if (!state.keys[payload]) {
        return;
      }

      state.keys[payload].isDown = false;
      state.keys[payload].isPressed = false;
    },
  },
});

export const {
  keyDown,
  keyUp,
} = inputSlice.actions;

export default inputSlice.reducer;

