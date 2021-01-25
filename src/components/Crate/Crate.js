import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import crateSprite from "../../assets/Crate.png";

import { ENTITY_STATE } from "../../constants";
import { Node } from "../Node/Node";
import { Sprite } from "../Sprite/Sprite";

const hitAnimation = (nodeRef) => {
  const sprite = nodeRef.current.querySelectorAll("#sprite");

  gsap.to(sprite, { filter: "grayscale(1) invert(1) brightness(100)", duration: .1 });
};

export function Crate({ x, y, zIndex, state, visible }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    if (state === ENTITY_STATE.HIT) {
      hitAnimation(nodeRef);    
    }
  }, [nodeRef, state]);

  return (
    <Node
      x={x}
      y={y}
      zIndex={zIndex}
      ref={nodeRef}
      visible={visible}
    >
      <Sprite
        src={crateSprite}
        id="sprite"
        width={19}
        height={18}
        node={{
          y: -8,
          x: 6,
        }}
      />
    </Node>
  )
};
