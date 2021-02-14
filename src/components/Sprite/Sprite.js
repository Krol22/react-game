import React from "react";
import styled from "styled-components";

import { Node } from "../Node";

export const SpriteContainer = styled.div.attrs(({ 
  offsetX = 0,
  offsetY = 0,
  flipH = false,
  flipV = false,
  width = 0,
  height = 0,
  frame = 0,
  src,
}) => ({
  style: {
    left: offsetX,
    top: offsetY,
    transform: `
      scaleX(${flipV ? "-1": "1"})
      scaleY(${flipH ? "-1": "1"})
    `,
    width: width,
    height: height,
    background: `url(${src})`,
    backgroundPosition: `${frame * width}px 0`,
  }
}))`
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  position: relative;
`;

export const Sprite = React.memo(({
  node,
  ...sprite
}) => {
  const { width, height } = sprite;

  return (
    <Node {...node} width={width} height={height}>
      <SpriteContainer {...sprite} />
    </Node>
  );
});
