import React from "react";

import { Node } from "../Node";
import { Sprite } from "../Sprite";

import fogAsset from "../../assets/Fog.png";
import blockAsset from "../../assets/Block.png";

      // {fogged && (
        // <Sprite
          // src={fogAsset}
          // width={31}
          // height={13}
          // node={{
            // x,
            // y: y - 2,
          // }}
        // />
      // )}
          // frame={fogged ? 1 : 0}

export const DirtTile = ({ x, y, fogged }) => {
  return (
    <>
      <Node x={x} y={y}>
        <Sprite
          src={blockAsset}
          width={31}
          height={23}
        />
      </Node>
    </>
  );
};
