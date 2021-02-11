import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import gsap from "gsap";

import enemySprite from "../../assets/Skeleton.png";
import smallShadowSprite from "../../assets/SmallShadow.png";

import { Node } from "../Node";
import { Sprite } from "../Sprite";
import { HealthBar } from "../HealthBar";
import useGsapAnimations from "../../hooks/useGsapAnimations";
import { ENTITY_STATE } from "../../constants";

import enemyAnimations, { hitAnimation } from "./Enemy.animations";

const scaleEnemy = (nodeRef, scale) => {
  const elements = [
    nodeRef.current.querySelector("#body-sprite"),
  ];

  gsap.set(elements, { scaleX: scale });
};

const Enemy = styled(Node)`
  transition: opacity .2s steps(4) .2s;
  opacity: 1;
  ${({fogged}) => fogged && `opacity: 0;`}
`;

export const Skeleton = React.memo(({
  x, y,
  zIndex,
  attributes,
  state,
  facing,
  fogged,
}) => {
  const nodeRef = useRef(null);

  const [ bodySpriteOffsetY, setBodySpriteOffsetY ] = useState(0);
  const { playAnimation } = useGsapAnimations(nodeRef, enemyAnimations);
  const { health } = attributes;

  useEffect(() => {
    switch(state) {
      case ENTITY_STATE.IDLE:
        playAnimation("idle");
        setBodySpriteOffsetY(0);
        break;
      case ENTITY_STATE.MOVE:
        playAnimation("move", facing);
        break;
      case ENTITY_STATE.ATTACK:
        playAnimation("attack", facing);
        break;
      case ENTITY_STATE.HIT: {
        hitAnimation(nodeRef);
        break;
      }
      case ENTITY_STATE.DEAD: {
        hitAnimation(nodeRef);
        playAnimation("dead");
        setBodySpriteOffsetY(3);
        break;
      }
    }
  }, [state]);

  useEffect(() => {
    if (facing === "TOP") { scaleEnemy(nodeRef, -1) }
    if (facing === "BOTTOM") { scaleEnemy(nodeRef, 1) }
    if (facing === "LEFT") { scaleEnemy(nodeRef, 1) }
    if (facing === "RIGHT") { scaleEnemy(nodeRef, -1) }
  }, [nodeRef, facing]);

  return (
    <Enemy x={x + 11} y={y - 10} width={16} height={5} zIndex={zIndex} ref={nodeRef} fogged={fogged}>
      <Sprite
        id="shadow-sprite"
        src={smallShadowSprite}
        width={16}
        height={5}
        node={{
          y: 14,
        }}
      />
      <Sprite
        id="body-sprite"
        src={enemySprite}
        width={16}
        height={16}
        node={{
          y: bodySpriteOffsetY,
        }}
      />
      {state !== ENTITY_STATE.DEAD && ( 
        <HealthBar
          health={health}
          node={{
            x: -1,
            y: -3,
            id: "health-bar"
          }}
        />
      )}
    </Enemy>
  )
});

Skeleton.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
}
