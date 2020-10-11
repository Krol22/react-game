import { useState, useCallback } from "react";
import { TILE_WIDTH_HALF, TILE_HEIGHT_HALF } from "../constants";

const useEnemyAttack = (idleAction) => {
  const [offsetY, setOffsetY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  const playAttack = useCallback((direction) => {
    const x = direction.y < 0 || direction.x > 0 ? 1 : -1;
    const y = direction.x > 0 || direction.y > 0 ? 1 : -1;

    setOffsetX(-x * TILE_WIDTH_HALF / 8);
    setOffsetY(-y * TILE_HEIGHT_HALF / 8);

    setTimeout(() => {
      setOffsetX(x * (TILE_WIDTH_HALF / 2));
      setOffsetY(y * (TILE_HEIGHT_HALF / 2));
    }, 200);

    setTimeout(() => {
      setOffsetX(0);
      setOffsetY(0);
      idleAction();
    }, 400);
  }, [idleAction]);

  return [offsetX, offsetY, playAttack];
};

export default useEnemyAttack;
