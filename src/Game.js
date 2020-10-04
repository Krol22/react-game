import React from "react";
import styled from "styled-components";

import Tile from "./components/Tile/Tile";

import blockSprite from "./assets/Block.png";

const items = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 0, y: 2 },
  { x: 1, y: 2 },
  { x: 2, y: 2 },
];

const Board = styled.div`
  position: relative;
`;

const Game = () => {
  return (
    <Board>
      {items.map(item => (
        <Tile {...item} src={blockSprite} />
      ))}
    </Board>
  );
};

export default Game;
