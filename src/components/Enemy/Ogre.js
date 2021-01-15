import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import enemySprite from "../../assets/Ogre.png";

import { Node } from "../Node";
import { Sprite } from "../Sprite";
import useGsapAnimations from "../../hooks/useGsapAnimations";

import enemyAnimations from "./Enemy.animations";

export function Ogre({ x, y }) {
  const nodeRef = useRef(null);

  const { playAnimation } = useGsapAnimations(nodeRef, enemyAnimations);

  useEffect(() => {
    playAnimation("idle");
  }, [nodeRef]);

  return (
    <div ref={nodeRef}>
      <Node x={x - 1} y={y - 18}>
        <Sprite
          id="body-sprite"
          src={enemySprite}
          width={32}
          height={32}
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
