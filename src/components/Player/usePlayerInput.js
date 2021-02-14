import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { step } from "../../slices/game/actions";
import { 
  ARROW_LEFT,
  ARROW_RIGHT,
  ARROW_UP,
  ARROW_DOWN,
  SPACE,
  GAME_ACTION,
} from "../../constants";

const usePlayerInput = () => {
  const dispatch = useDispatch();
  const stepTimeoutRef = useRef(null);

  const keys = useSelector((state) => state.input.keys);
  const tick = useSelector((state) => state.game.tick);

  useEffect(() => {
    if (!tick) {
      stepTimeoutRef.current = setTimeout(() => {
        dispatch(step({
          name: GAME_ACTION.PLAYER_SKIP,
        }));
      }, 1000);
    } else {
      window.clearTimeout(stepTimeoutRef.current);
    }
  }, [tick]);

  useEffect(() => {
    if (tick) {
      return;
    }

    if (keys[ARROW_LEFT].isDown !== keys[ARROW_LEFT].isPressed) {
      window.clearTimeout(stepTimeoutRef.current);
      dispatch(step({
        name: GAME_ACTION.PLAYER_MOVE,
        direction: {
          x: -1, y: 0,
        },
      }));
    }
    if (keys[ARROW_RIGHT].isDown !== keys[ARROW_RIGHT].isPressed) {
      window.clearTimeout(stepTimeoutRef.current);
      dispatch(step({
        name: GAME_ACTION.PLAYER_MOVE,
        direction: {
          x: 1, y: 0,
        },
      }));
    }
    if (keys[ARROW_UP].isDown !== keys[ARROW_UP].isPressed) {
      window.clearTimeout(stepTimeoutRef.current);
      dispatch(step({
        name: GAME_ACTION.PLAYER_MOVE,
        direction: {
          x: 0, y: -1,
        },
      }));
    }
    if (keys[ARROW_DOWN].isDown !== keys[ARROW_DOWN].isPressed) {
      window.clearTimeout(stepTimeoutRef.current);
      dispatch(step({
        name: GAME_ACTION.PLAYER_MOVE,
        direction: {
          x: 0, y: 1,
        },
      }));
    }
    if (keys[SPACE].isDown !== keys[SPACE].isPressed) {
      dispatch(step({
        name: GAME_ACTION.PLAYER_SKIP,
      }));
    }
  }, [keys, dispatch, tick]);
};

export default usePlayerInput;
