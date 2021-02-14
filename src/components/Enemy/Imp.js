import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import gsap from "gsap";

import enemySprite from "../../assets/Imp.png";
import smallShadowSprite from "../../assets/SmallShadow.png";

import { Node } from "../Node";
import { Sprite } from "../Sprite";
import useGsapAnimations from "../../hooks/useGsapAnimations";
import { ENTITY_STATE } from "../../constants";

import enemyAnimations, { hitAnimation } from "./Enemy.animations";

const Enemy = styled(Node)`
  transition: opacity .2s steps(4) .2s;
  opacity: 1;
  ${({fogged}) => fogged && `opacity: 0;`}
`;

export const Imp = React.memo(({ x, y, zIndex, state, facing, fogged }) => {
  const nodeRef = useRef(null);

  const [ bodySpriteOffsetY, setBodySpriteOffsetY ] = useState(0);
  const { playAnimation } = useGsapAnimations(nodeRef, enemyAnimations);

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
        // TODO: implement me,
        break;
      case ENTITY_STATE.DEAD:
        hitAnimation(nodeRef);

        playAnimation("dead");
        setBodySpriteOffsetY(3);

        break;
    }
  }, [state]);

  useEffect(() => {
    if (facing === "TOP") { gsap.set(nodeRef.current, { scaleX: -1 }) }
    if (facing === "BOTTOM") { gsap.set(nodeRef.current, { scaleX: 1 }) }
    if (facing === "LEFT") { gsap.set(nodeRef.current, { scaleX: 1 }) }
    if (facing === "RIGHT") { gsap.set(nodeRef.current, { scaleX: -1 }) }
  }, [nodeRef, facing]);

  return (
    <Enemy
      x={x + 7} 
      y={y - 10}
      zIndex={zIndex}
      ref={nodeRef}
      width={16}
      height={5}
      fogged={fogged}
    >
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
    </Enemy>
  )
});

Imp.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
}
