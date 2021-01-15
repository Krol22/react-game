import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import enemySprite from "../../assets/Imp.png";
import smallShadowSprite from "../../assets/SmallShadow.png";

import { Node } from "../Node";
import { Sprite } from "../Sprite";
import useGsapAnimations from "../../hooks/useGsapAnimations";

import enemyAnimations from "./Enemy.animations";

export function Imp({ x, y }) {
  const nodeRef = useRef(null);

  const { playAnimation } = useGsapAnimations(nodeRef, enemyAnimations);

  useEffect(() => {
    playAnimation("idle");
  }, [nodeRef])

  return (
    <div ref={nodeRef}>
      <Node
        x={x + 7} 
        y={y - 10}
      >
        <Sprite
          id="body-sprite"
          src={enemySprite}
          width={16}
          height={16}
          node={{
            zIndex: 3,
          }}
        />
        <Sprite
          id="shadow-sprite"
          src={smallShadowSprite}
          width={16}
          height={5}
          node={{
            y: 14,
          }}
        />
      </Node>
    </div>
  )
};

Imp.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
}
