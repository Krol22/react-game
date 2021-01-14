import React from "react";
import PropTypes from "prop-types";

import enemySprite from "../../assets/Skeleton.png";

import { Node } from "../Node";
import { Sprite } from "../Sprite";

export function Skeleton({ x, y }) {
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

Skeleton.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
}
