import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadLevel } from "./gameSlice";
import { Level } from "./Level";

import level0 from "./data/newMap.json";

export const Game = () => {
  const dispatch = useDispatch();
  const { loaded, isLoading } = useSelector((state) => state.game);

  useEffect(() => {
    dispatch(loadLevel(level0));
  }, []);

  return (
    <>
      {(loaded && !isLoading) && (<Level />)}
    </>
  );
};
