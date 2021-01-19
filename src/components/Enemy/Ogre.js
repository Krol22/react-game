import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import enemySprite from "../../assets/Ogre.png";
import smallShadowSprite from "../../assets/SmallShadow.png";

import { Node } from "../Node";
import { Sprite } from "../Sprite";
import { HealthBar } from "../HealthBar";
import useGsapAnimations from "../../hooks/useGsapAnimations";

import enemyAnimations from "./Enemy.animations";

export function Ogre({ x, y, zIndex, currentHealth, maxHealth }) {
  const nodeRef = useRef(null);

  const { playAnimation } = useGsapAnimations(nodeRef, enemyAnimations);

  useEffect(() => {
    playAnimation("idle");
  }, [nodeRef]);

  return (
    <div ref={nodeRef}>
      <Node x={x} y={y - 20}>
        <Sprite
          id="body-sprite"
          src={enemySprite}
          width={32}
          height={32}
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
            y: 30,
            x: 8,
            scaleX: 2,
            scaleY: 2,
          }}
        />
        <HealthBar
          currentHealth={currentHealth}
          maxHealth={maxHealth}
          size={2}
          node={{
            x: -1,
            zIndex: zIndex + 2
          }}
        />
      </Node>
    </div>
  )
};

Ogre.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
}
