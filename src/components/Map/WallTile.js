import React from "react";

import { Node } from "../Node";
import { Sprite } from "../Sprite";

import wallAsset from "../../assets/Wall.png";

export const WallTile = ({ x, y }) => {
  return (
    <Node x={x} y={y}>
      <Sprite 
        src={wallAsset}
        width={31}
        height={38}
        offsetY={-26}
      />
    </Node>
  );
};
