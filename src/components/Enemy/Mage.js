import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import enemySprite from "../../assets/Mage.png";
import smallShadowSprite from "../../assets/SmallShadow.png";

import { Node } from "../Node";
import { Sprite } from "../Sprite";
import { HealthBar } from "../HealthBar";
import useGsapAnimations from "../../hooks/useGsapAnimations";
import { ENTITY_STATE } from "../../constants";

import enemyAnimations, { hitAnimation } from "./Enemy.animations";

export function Mage({ x, y, zIndex, currentHealth, maxHealth, state }) {
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
        // TODO: implement me,
        break;
      case ENTITY_STATE.ATTACK:
        // TODO: implement me,
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

  return (
    <div ref={nodeRef}>
      <Node x={x + 6} y={y - 10} zIndex={zIndex}>
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
            currentHealth={currentHealth}
            maxHealth={maxHealth}
            node={{
              x: -1,
              y: -4,
            }}
          />
        )}
      </Node>
    </div>
  )
};

Mage.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
  currentHealth: PropTypes.number.isRequired,
  maxHealth: PropTypes.number.isRequired,
}
