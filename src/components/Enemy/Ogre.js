import React from "react";
import PropTypes from "prop-types";

import ogreSprite from "../../assets/Ogre.png";

import { Node } from "../Node";
import { Sprite } from "../Sprite";

export function Ogre({ x, y }) {
  return (
    <Node x={x} y={y}>
      <Sprite
        id="body-sprite"
        src={ogreSprite}
        width={32}
        height={32}
      />
    </Node>
  )
};

Ogre.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
}
