import React from "react";

import { Node } from "../Node";
import { Autotile } from "../Autotile/Autotile";

import fogAsset from "../../assets/Fog.png";
import tilesetAsset from "../../assets/DirtTileset.png";

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

export const DirtTile = React.memo(({ x, y, zIndex, offset }) => {
  return (
    <>
      <Node x={x} y={y} zIndex={zIndex}>
        <Autotile
          src={tilesetAsset}
          width={39}
          height={23}
          offset={offset}
        />
      </Node>
    </>
  );
});
