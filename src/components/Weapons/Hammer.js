import React from "react";

import hammerSprite from "../../assets/Hammer.png";

import { Sprite } from "../Sprite";

export function Hammer({ node }) {
  return (
    <Sprite
      node-id="hammer"
      src={hammerSprite}
      width={10}
      height={37}
      node={{
        rotation: -90,
        anchorPoint: "50% 70%",
        ...node,
      }}
    />
  );
};
