import { useState, useCallback } from "react";

const useMove = (idleAction) => {
  const [offsetY, setOffsetY] = useState(0);

  const move = useCallback(() => {
    setOffsetY(-10);

    setTimeout(() => {
      setOffsetY(0);
    }, 450 / 2);

    setTimeout(() => {
      idleAction();
    }, 450);
  }, [idleAction]);

  return [offsetY, move];
};

export default useMove;
