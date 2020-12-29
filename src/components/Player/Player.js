import React from "react";
import PropTypes from "prop-types";

import playerSprite from "../../assets/Player.png";
import swordSprite from "../../assets/Sword.png";

import { Node } from "../Node";
import { Sprite } from "../Sprite";

export function Player({ x, y }) {
  return (
    <Node
      x={x}
      y={y}
      width={16}
      height={16}
    >
      <Sprite
        node-id="player"
        src={playerSprite}
        width={16}
        height={16}
      />
      <Sprite
        node-id="player-weapon"
        src={swordSprite}
        width={8}
        height={21}
        node={{
          x: -3,
          y: -3,
          rotation: -15,
        }}
      />
    </Node>
  );
};

Player.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};
