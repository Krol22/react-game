import React from "react";
import spikesSprite from "../../assets/Spikes.png";

import { ENTITY_STATE } from "../../constants";
import { Node } from "../Node/Node";
import { Sprite } from "../Sprite/Sprite";

export const Spikes = React.memo(({ x, y, zIndex, state, fogged }) => {
  return (
    <Node x={x} y={y} zIndex={zIndex} visible={!fogged}>
      <Sprite
        src={spikesSprite}
        width={39}
        height={11}
        frame={state === ENTITY_STATE.SHOW ? 0 : 1}
      />
    </Node>
  );
});
