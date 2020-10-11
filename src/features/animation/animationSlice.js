import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tick: 0,
  animations: {
    IDLE: {
      0: {
        offsetY: 0,
      },
      50: {
        offsetY: -10,
      },
      100: {
        offsetY: 0,
      }
    }
  },
  currentAnimations: {
    player: {
      animationName: "IDLE",
      currentTick: 0,
    },
  }
};

