import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emitterStates: [],
};

const particleSlice = createSlice({
  name: "particle",
  initialState,
  reducers: {
    addParticleEmitter: (state, { payload }) => {},
    updateEmitters: (state, { payload }) => {},
  },
});

export const {
  addParticleEmitter,
  updateEmitters,
} = particleSlice.actions;

export default particleSlice.reducer;
