import React from "react";

import useInputManager from "./hooks/useInputManager";
import usePlayerInput from "./components/Player/usePlayerInput";

export const Input = () => {
  useInputManager();
  usePlayerInput();

  return <></>;
};
