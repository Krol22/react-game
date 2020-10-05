import React from "react";
import styled from "styled-components";

import Tile from "./components/Tile/Tile";
import Player from "./components/Player/Player";
import Background from "./components/Background";

import blockSprite from "./assets/Block.png";

const items = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 3, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
  { x: 0, y: 2 },
  { x: 1, y: 2 },
  { x: 2, y: 2 },
  { x: 3, y: 2 },
  { x: 0, y: 3 },
  { x: 1, y: 3 },
  { x: 2, y: 3 },
  { x: 3, y: 3 },
];

const Board = styled.div`
  position: relative;
`;

const Game = () => {
  return (
    <>
      <Background />
      <Board>
        {items.map(item => (
          <Tile {...item} src={blockSprite} />
        ))}
        <Player />
      </Board>
    </>
  );
};

export default Game;
