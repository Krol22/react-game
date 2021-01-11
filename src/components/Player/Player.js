import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import playerSprite from "../../assets/Player.png";

import { Node } from "../Node";
import { Sprite } from "../Sprite";
import { Sword, Hammer } from "../Weapons";
import { HealthBar } from "../HealthBar";
import useGsapAnimations from "../../hooks/useGsapAnimations";

import playerAnimations from "./Player.animations";
import { TILE_WIDTH_HALF, TILE_HEIGHT_HALF } from "../../constants";

const weapons = {
  sword: {
    Weapon: Sword,
    node: {
      id: "player-weapon",
      x: -3,
      y: -3,
      zIndex: 3,
    },
  },
  hammer: {
    Weapon: Hammer,
    node: {
      id: "player-weapon",
      x: -3,
      y: -6,
      zIndex: 3,
    },
  },
};


export function Player({ x, y, weapon, state, flipX }) {
  const nodeRef = useRef(null);

  const { Weapon, node } = weapons[weapon];

  const { playAnimation } = useGsapAnimations(nodeRef, playerAnimations);

  useEffect(() => {
    if (state === "idle") {
      playAnimation("idle");
    } else if (state === "test") {
      playAnimation("test");
    } else if (state === "attack") {
      playAnimation("attack");
    }

    return () => {}

  }, [nodeRef, state, weapon]);

  return (
    <div ref={nodeRef}>
      <Node
        x={x + TILE_WIDTH_HALF / 2 - 2}
        y={y - TILE_HEIGHT_HALF}
        width={16}
        height={16}
        zIndex={10}
      >
        <HealthBar
          currentHealth={75}
          maxHealth={100}
          node={{
            y: -2,
            zIndex: 4,
          }}
        />
        <Sprite
          id="player-sprite"
          src={playerSprite}
          width={16}
          height={16}
          flipV={flipX}
          node={{
            zIndex: 3,
          }}
        />
        <Weapon node={node} />
      </Node>
    </div>
  );
};

Player.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  weapon: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  flipX: PropTypes.bool,
};
