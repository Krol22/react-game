import React from "react";

import { Node } from "../Node";
import { Sprite } from "../Sprite";

import blockAsset from "../../assets/Block.png";

export const DirtTile = ({ x, y }) => {
  return (
    <Node x={x} y={y}>
      <Sprite src={blockAsset} width={31} height={23} />
    </Node>
  );
};
