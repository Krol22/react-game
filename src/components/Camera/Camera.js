import React from "react"
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Node } from "../Node";
import { mapToIsometric } from "../../helpers/mapToIsometric";

const CameraWrapper = styled(Node)`
  transition: top 0.4s ease-in-out, left 0.4s ease-in-out;
`;

export const Camera = ({ children }) => {
  const { x, y } = useSelector((state) => state.camera);

  const { x: cameraX, y: cameraY } = mapToIsometric({ x, y });

  return (
    <CameraWrapper x={cameraX} y={cameraY}>
      {children}    
    </CameraWrapper>
  );
};
