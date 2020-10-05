import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Position from "../Position";
import Sprite from "../Sprite";

const TILE_WIDTH_HALF = 19;
const TILE_HEIGHT_HALF = 8;

const mapToIsometric = (x, y) => {
  return {
    left: (x - y) * TILE_WIDTH_HALF,
    top: (x + y) * TILE_HEIGHT_HALF, 
  };
};

const HoverElement = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  z-index: 2;
  transform: rotateX(65deg) rotateZ(45deg) translateY(-7px) translateZ(2px) translateX(-1px);
`;


const Tile = ({ x, y, src }) => {
  const { top, left } = mapToIsometric(x, y);
  const [ hover, setHover ] = useState(false);
  const [ frame, setFrame ] = useState(1);

  useEffect(() => {
    setFrame(Number(hover));
  }, [hover])

  return (
    <Position y={top} x={left}>
      <HoverElement onMouseEnter={() => {setHover(true)}} onMouseLeave={() =>{setHover(false)}} />
      <Sprite src={src} width={31} height={23} frame={frame}/>
    </Position>
  );
};

export default Tile;
