import React from "react";

import { DirtTile } from "./DirtTile";
import { WallTile } from "./WallTile";

export default {
  title: "game/Tile",
};

const DirtTemplate = () => (
  <DirtTile x={10} y={10} />
);

export const Dirt = DirtTemplate.bind({});

const WallTemplate = () => (
  <WallTile x={10} y={10} />
);

export const Wall = WallTemplate.bind({});
