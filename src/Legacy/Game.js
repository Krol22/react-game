import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import Tile from "./components/Tile/Tile";
import Player from "./components/Player/Player";
import Enemies from "./components/Imp/Enemies";
// import Background from "./components/Background/Background";
// import AudioPlayer from "./components/AudioPlayer";

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
  const { playerActionTime, worldActionTime } = useSelector((state) => state.game);

  useEffect(() => {
    if (!shouldTick) {
      return;
    }

    if (skipTurn) {
      dispatch(tick());

      setTimeout(() => {
        dispatch(endTick());
      }, worldActionTime);

      return;
    }

    setTimeout(() => {
      dispatch(tick());
    }, playerActionTime);

    setTimeout(() => {
      dispatch(endTick());
    }, playerActionTime + worldActionTime);
  }, [dispatch, shouldTick]);

  return (
    <>
      {/* disabled for performance reasons - <Background /> */}
      {/* <AudioPlayer /> */ }
      <Board>
        {map.map(mapElement => (
          <Tile
            key={`${mapElement.x}${mapElement.y}`} 
            src={blockSprite}
            {...mapElement}
          />
        ))}
        {/* <Enemies /> */}
        <Player />
      </Board>
    </>
  );
};

export default Game;
