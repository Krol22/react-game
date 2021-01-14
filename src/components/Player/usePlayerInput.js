import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { movePlayer } from "../../gameSlice";
import { 
  ARROW_LEFT,
  ARROW_RIGHT,
  ARROW_UP,
  ARROW_DOWN,
} from "../../constants";

const usePlayerInput = () => {
  const dispatch = useDispatch();

  const keys = useSelector((state) => state.input.keys);

  useEffect(() => {
    if (keys[ARROW_LEFT].isDown !== keys[ARROW_LEFT].isPressed) {
      dispatch(movePlayer({ x: -1, y: 0 }));
    }
    if (keys[ARROW_RIGHT].isDown !== keys[ARROW_RIGHT].isPressed) {
      dispatch(movePlayer({ x: 1, y: 0 }));
    }
    if (keys[ARROW_UP].isDown !== keys[ARROW_UP].isPressed) {
      dispatch(movePlayer({ x: 0, y: -1 }));
    }
    if (keys[ARROW_DOWN].isDown !== keys[ARROW_DOWN].isPressed) {
      dispatch(movePlayer({ x: 0, y: 1 }));
    }
  }, [keys, dispatch]);
};

export default usePlayerInput;
