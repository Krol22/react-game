import React from "react";

import swordAsset from "../../assets/Sword.png";

import { Sprite } from "./Sprite";

export default {
  title: "components/Node",
};

const SpriteTemplate = () => (
  <Sprite 
    src={swordAsset} 
    width={8}
    height={21}
    node={{
      x: 30,
      y: 30,
    }}
  />
);

export const SpriteNode = SpriteTemplate.bind({});

SpriteNode.args = {};
