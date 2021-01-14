import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { keyDown, keyUp } from "../inputSlice";

const useInputManager = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const onKeyDown = (event) => {
      dispatch(keyDown(event.which));
    };

    const onKeyUp = (event) => {
      dispatch(keyUp(event.which));
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };

  }, []);
};

export default useInputManager;
