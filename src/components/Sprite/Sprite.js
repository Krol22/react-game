import React from "react";
import styled from "styled-components";

import { Node } from "../Node";

export const SpriteContainer = styled.div`
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  position: relative;

  ${({
    offsetX = 0,
    offsetY = 0,
    flipH = false,
    flipV = false,
    width = 0,
    height = 0,
    frame = 0,
    src,
  }) => `
    left: ${offsetX}px;
    top: ${offsetY}px;
    background: url(${src});
    background-position: ${frame * width}px 0;

    transform: 
      scaleX(${flipV ? "-1": "1"})
      scaleY(${flipH ? "-1": "1"});

    width: ${width}px;
    height: ${height}px;
  `}
`;

export const Sprite = ({
  node,
  ...sprite
}) => {
  const { width, height } = sprite;

  return (
    <Node {...node} width={width} height={height}>
      <SpriteContainer {...sprite} />
    </Node>
  );
};
