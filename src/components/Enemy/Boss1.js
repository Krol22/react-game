import React from "react";
import PropTypes from "prop-types";

import bossSprite from "../../assets/Boss1.png";

import { Node } from "../Node";
import { Sprite } from "../Sprite";

export function Boss1({ x, y }) {
  return (
    <Node x={x} y={y}>
      <Sprite
        id="body-sprite"
        src={bossSprite}
        width={32}
        height={32}
      />
    </Node>
  )
};

Boss1.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
}
