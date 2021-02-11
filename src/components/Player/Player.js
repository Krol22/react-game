import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";

import playerSprite from "../../assets/Player.png";
import smallShadowSprite from "../../assets/SmallShadow.png";

import { Node } from "../Node";
import { Sprite } from "../Sprite";
import { Weapon } from "../Weapons";
import useGsapAnimations from "../../hooks/useGsapAnimations";

import playerAnimations, { hitAnimation } from "./Player.animations";
import { TILE_WIDTH_HALF, TILE_HEIGHT_HALF, ENTITY_STATE } from "../../constants";

const weapons = {
  sword: {
    node: {
      id: "player-weapon",
      x: -3,
      y: -3,
      zIndex: 3,
    },
  },
  hammer: {
    node: {
      id: "player-weapon",
      x: -3,
      y: -6,
      zIndex: 3,
    },
  },
};

export const PlayerContainer = React.memo(({ state, x, y, ...rest }) => {
  const [currentPosition, setCurrentPosition] = useState({x, y});

  return (
    <Player
      x={currentPosition.x}
      y={currentPosition.y}
      newX={x}
      newY={y}
      state={state}
      changePosition={setCurrentPosition} 
      {...rest}
    />
  );
});


export const Player = React.memo(({
  x,
  y,
  weapon,
  state,
  moveDir,
  zIndex,
  newX,
  newY,
  changePosition,
}) => {
  const nodeRef = useRef(null);

  const { node } = weapons[weapon];
  const { playAnimation } = useGsapAnimations(nodeRef, playerAnimations);

  useEffect(() => {
    if (moveDir === "TOP") { gsap.set(nodeRef.current, { scaleX: 1 }) }
    if (moveDir === "BOTTOM") { gsap.set(nodeRef.current, { scaleX: -1 }) }
    if (moveDir === "LEFT") { gsap.set(nodeRef.current, { scaleX: -1 }) }
    if (moveDir === "RIGHT") { gsap.set(nodeRef.current, { scaleX: 1 }) }

    if (state === ENTITY_STATE.IDLE) {
      playAnimation("idle");
    } else if (state === ENTITY_STATE.ATTACK) {
      playAnimation("attack", moveDir);
    } else if (state === ENTITY_STATE.MOVE) {
      playAnimation("move", moveDir);
    } else if (state === ENTITY_STATE.SPAWN) {
      playAnimation("spawn");
    } else if (state === ENTITY_STATE.HIT) {
      hitAnimation(nodeRef);
    }

    return () => {
      if (state === ENTITY_STATE.MOVE) {
        changePosition({ x: newX, y: newY });
      }
    };

  }, [nodeRef, state, weapon, moveDir, newX, newY]);

  return (
    <Node
      x={x + TILE_WIDTH_HALF / 2 + 1}
      y={y - TILE_HEIGHT_HALF - 4}
      width={16}
      height={16}
      zIndex={zIndex + 1}
      ref={nodeRef}
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
        id="player-sprite"
        src={playerSprite}
        width={16}
        height={16}
      />
      <Weapon name={weapon} node={{...node}} />
    </Node>
  );
});

Player.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  weapon: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  flipX: PropTypes.bool,
};
