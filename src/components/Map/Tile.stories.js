import React from "react";

import { DirtTile } from "./DirtTile";

export default {
  title: "game/Tile",
};

const DirtTemplate = () => (
  <DirtTile x={10} y={10} />
);

export const Dirt = DirtTemplate.bind({});
