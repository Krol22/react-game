import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Position from "../Game/Position";
import Sprite from "../Game/Sprite";

import { mapToIsometric } from "../../helpers/mapToIsometric";

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
