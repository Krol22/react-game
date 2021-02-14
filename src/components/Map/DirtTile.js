import React from "react";

import { Node } from "../Node";
import { Autotile } from "../Autotile/Autotile";

import tilesetAsset from "../../assets/DirtTileset.png";

export const DirtTile = React.memo(({ x, y, zIndex, offset, discovered, fogged }) => {
  return (
    <>
      <Node x={x} y={y} zIndex={zIndex} visible={discovered}>
        <Autotile
          src={tilesetAsset}
          width={39}
          height={23}
          offset={offset}
          fogged={fogged}
        />
      </Node>
    </>
  );
});
