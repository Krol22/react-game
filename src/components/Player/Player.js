import React from "react";
import PropTypes from "prop-types";

import playerSprite from "../../assets/Player.png";

import { Node } from "../Node";
import { Sprite } from "../Sprite";
import { Sword, Hammer } from "../Weapons";
import { HealthBar } from "../HealthBar";

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

export function Player({ x, y, weapon = "sword" }) {
  const { Weapon, node } = weapons[weapon];

  return (
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
        node-id="player"
        src={playerSprite}
        width={16}
        height={16}
        node={{
          zIndex: 3,
        }}
      />
      <Weapon node={node} />
    </Node>
  );
};

Player.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  weapon: PropTypes.string.isRequired,
};
