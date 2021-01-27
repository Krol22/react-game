import React from "react"
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Node } from "../Node";
import { mapToIsometric } from "../../helpers/mapToIsometric";
import { TILE_WIDTH_HALF, TILE_HEIGHT_HALF } from "../../constants";

const CameraWrapper = styled(Node)`
  transition: top 0.4s ease-in-out, left 0.4s ease-in-out;
`;

export const Camera = ({ children }) => {
  const { x, y } = useSelector((state) => state.camera);

  const { x: cameraX, y: cameraY } = mapToIsometric({ x, y });

  return (
    <CameraWrapper x={cameraX - TILE_WIDTH_HALF} y={cameraY - TILE_HEIGHT_HALF}>
      {children}    
    </CameraWrapper>
  );
};
