import React from "react";

import { Node } from "./Node";

export default {
  title: "components/Node",
  argTypes: {
    rotation: {
      control: {
        type: "range",
        min: -360,
        max: 360,
        step: 1,
      },
    },
  }
};

const NodeTemplate = ({
  x, y, zIndex, rotation, scaleX, scaleY, debug,
}) => (
  <Node 
    x={x}
    y={y}
    zIndex={zIndex}
    rotation={rotation}
    scaleX={scaleX}
    scaleY={scaleY}
    debug={debug}>
    Game Node
  </Node>
);

export const BaseNode = NodeTemplate.bind({});

BaseNode.args = {
  x: 0,
  y: 0,
  zIndex: 0,
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
  debug: true,
};
