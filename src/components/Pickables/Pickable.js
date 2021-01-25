import React, { useEffect, useRef } from "react";

import { Sprite } from "../Sprite";
import { Node } from "../Node";
import { ENTITY_STATE } from "../../constants";

import { pickables } from "./Pickables";
import pickableAnimations from "./Pickable.animations";
import useGsapAnimations from "../../hooks/useGsapAnimations";

export const Pickable = ({ name, x, y, zIndex, visible, state }) => {
  const { node, sprite } = pickables[name];

  const nodeRef = useRef(null);

  const { playAnimation } = useGsapAnimations(nodeRef, pickableAnimations);

  useEffect(() => {
    if (state === ENTITY_STATE.IDLE) {
      playAnimation("idle");
    }
    if (state === ENTITY_STATE.PICK) {
      playAnimation("pick");
    }
    if (state === ENTITY_STATE.SPAWN) {
      playAnimation("spawn");
    }
  }, [nodeRef, state]);

  return (
    <Node
      x={x + node.offsetX}
      y={y + node.offsetY}
      zIndex={zIndex}
      visible={visible}
      ref={nodeRef}
    >
      <Sprite
        id="sprite"
        src={sprite.img}
        width={sprite.width}
        height={sprite.height}
      />
    </Node>
  )
};
