import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import Tile from "./components/Tile/Tile";
import Player from "./components/Player/Player";
import Enemies from "./components/Enemy/Enemies";
import Background from "./components/Background";

import { tick, endTick } from "./features/gameSlice";

import blockSprite from "./assets/Block.png";

const Board = styled.div`
  position: relative;
`;

const Game = () => {
  const dispatch = useDispatch();
  const map = useSelector((state) => state.game.map);
  const shouldTick = useSelector((state) => state.game.shouldTick);
  const skipTurn = useSelector((state) => state.game.skipTurn);

  useEffect(() => {
    if (!shouldTick) {
      return;
    }

    if (skipTurn) {
      dispatch(tick());

      setTimeout(() => {
        dispatch(endTick());
      }, 500);

      return;
    }

    setTimeout(() => {
      dispatch(tick());
    }, 500);

    setTimeout(() => {
      dispatch(endTick());
    }, 1000);
  }, [dispatch, shouldTick]);

  return (
    <>
      <Background />
      <Board>
        {map.map(mapElement => (
          <Tile
            key={`${mapElement.x}${mapElement.y}`} 
            src={blockSprite}
            {...mapElement}
          />
        ))}
        <Enemies />
        <Player />
      </Board>
    </>
  );
};

export default Game;
