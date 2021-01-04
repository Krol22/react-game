import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import playerSprite from "../../assets/Player.png";

import { Node } from "../Node";
import { Sprite } from "../Sprite";
import { Sword, Hammer } from "../Weapons";
import { HealthBar } from "../HealthBar";
import useGsapAnimations from "../../hooks/useGsapAnimations";

import playerAnimations from "./Player.animations";

const weapons = {
  sword: {
    Weapon: Sword,
    node: {
      x: -3,
      y: -3,
      zIndex: 3,
    },
  },
  hammer: {
    Weapon: Hammer,
    node: {
      x: -3,
      y: -6,
      zIndex: 3,
    },
  },
};

export function Player({ x, y, weapon = "sword", state = "idle" }) {
  const { Weapon, node } = weapons[weapon];

  const nodeRef = useRef(null);

  const { playAnimation } = useGsapAnimations(nodeRef, playerAnimations);

  useEffect(() => {
    if (state === "idle") {
      playAnimation("idle");
    } else if (state === "test") {
      playAnimation("test");
    }

    return () => {}

  }, [nodeRef, state]);

  return (
    <div ref={nodeRef}>
      <Node
        x={x}
        y={y}
        width={16}
        height={16}
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
};
