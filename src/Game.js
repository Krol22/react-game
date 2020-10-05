import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Tile from "./components/Tile/Tile";
import Player from "./components/Player/Player";
import Background from "./components/Background";

import blockSprite from "./assets/Block.png";

const Board = styled.div`
  position: relative;
`;

const Game = () => {
  const map = useSelector((state) => state.game.map);

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
        <Player />
      </Board>
    </>
  );
};

export default Game;
