import React from "react";
import PropTypes from "prop-types";

import enemySprite from "../../assets/Enemy.png";

import { Node } from "../Node";
import { Sprite } from "../Sprite";

export function Enemy({ x, y }) {
  return (
    <Node x={x} y={y}>
      <Sprite
        id="body-sprite"
        src={enemySprite}
        width={16}
        height={16}
      />
    </Node>
  )
};

Enemy.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
}
