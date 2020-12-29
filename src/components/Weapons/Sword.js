import React from "react";

import swordSprite from "../../assets/Sword.png";

import { Sprite } from "../Sprite";

export function Sword({ node }) {
  return (
    <Sprite
      node-id="sword"
      src={swordSprite}
      width={8}
      height={21}
      node={{
        rotation: -45,
        ...node,
      }}
    />
  )
};
