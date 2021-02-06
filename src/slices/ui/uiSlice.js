import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  initialState: {
    showExampleText: false,
    text: "",
  },
  name: "ui",
  reducers: {
    showExampleText: (state, { payload }) => {
      state.showExampleText = true;
      state.text = payload;
    },
    hideExampleText: (state) => {
      state.showExampleText = false;
    },
  },
});

export const {
  showExampleText,
  hideExampleText,
} = uiSlice.actions;

export default uiSlice.reducer;
