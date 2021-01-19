import React from "react";

import { Sprite } from "../Sprite";

import { weapons } from "./Weapons.js";

export const Weapon = React.memo(({ name, node }) => {
  const weapon = weapons[name];

  const {
    nodeId,
    sprite,
    node: nodeProps,
  } = weapon;

  return (
    <Sprite
      node-id={nodeId}
      src={sprite.img}
      width={sprite.width}
      height={sprite.height}
      node={{
        ...node,
        ...nodeProps,
      }}
    />
  );
});
