import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  showExampleText,
  hideExampleText,
} from "../ui/uiSlice";

const showText = createAsyncThunk(
  "pads/showText", (args, { dispatch }) => {
    const text = args.text;
    dispatch(showExampleText(text));
  },
);

const hideText = createAsyncThunk(
  "pads/hideText", (_, { dispatch }) => {
    dispatch(hideExampleText());
  },
);

export const padActions = {
  showText,
  hideText,
};
