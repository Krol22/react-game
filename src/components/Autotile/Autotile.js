import React from "react";
import styled from "styled-components";

import { Node } from "../Node";

export const AutotileContainer = styled.div`
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  position: relative;

  ${({
    src,
    width,
    height,
    row,
    col,
  }) => `
    background: url(${src});  
    background-position: ${-col * width}px ${-row * height}px;

    width: ${width}px;
    height: ${height}px;
  `}
`;

export const Autotile = ({
  node,
  ...rest
}) => {
  const { width, height, offset } = rest;

  const row = Math.floor(offset / 7);
  const col = offset % 7;

  return (
    <Node {...node} width={width} height={height}>
      <AutotileContainer {...rest} row={row} col={col} />
    </Node>
  );
};
