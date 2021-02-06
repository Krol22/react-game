import { createSlice } from "@reduxjs/toolkit";

// #TODO -> remove it or implement in future.
const entitySlice = createSlice({
  name: "entity",
  initialState: {
    objects: [],
  },
  reducers: {},
  extraReducers: {
    [loadLevel.fulfilled]: (state, { payload }) => {
    },
  },
});

export const { test } = entitySlice.actions;

export default entitySlice.reducer;
