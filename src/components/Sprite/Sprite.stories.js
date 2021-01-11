import React from "react";

import swordAsset from "../../assets/Sword.png";

import { Sprite } from "./Sprite";

export default {
  title: "components/Sprite",
  component: Sprite,
};

const SpriteTemplate = ({
  x, y, zIndex, rotation, scaleX, scaleY, debug,
  offsetX, offsetY, flipH, flipV, width, height,
}) => (
  <Sprite 
    src={swordAsset} 
    offsetX={offsetX}
    offsetY={offsetY}
    flipH={flipH}
    flipV={flipV}
    width={width}
    height={height}
    node={{
      x,
      y,
      zIndex,
      rotation,
      scaleX,
      scaleY,
      debug,
    }}
  />
);

export const SpriteNode = SpriteTemplate.bind({});

SpriteNode.args = {
  offsetX: 0,
  offsetY: 0,
  flipH: false,
  flipV: false,
  width: 8,
  height: 21,
  x: 30,
  y: 30,
  zIndex: 0,
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
  debug: true,
};
