import React from "react";

import { Node } from "../Node";
import { Map } from "./Map";

export default {
  title: "game/Map",
}
const MapTemplate = ({ map }) => (
  <Node x={60} y={30}>
    <Map map={map} />
  </Node>
);

export const MapEntity = MapTemplate.bind({});
MapEntity.args = {
  map: [
    { x: 0, y: 0, type: 0 },
    { x: 1, y: 0, type: 0 },
    { x: 2, y: 0, type: 0 },
    { x: 3, y: 0, type: 0 },
    { x: 0, y: 1, type: 0 },
    { x: 1, y: 1, type: 1 },
    { x: 2, y: 1, type: 1 },
    { x: 3, y: 1, type: 0 },
    { x: 0, y: 2, type: 1 },
    { x: 1, y: 2, type: 0 },
    { x: 2, y: 2, type: 0 },
    { x: 3, y: 2, type: 0 },
    { x: 0, y: 3, type: 0 },
    { x: 1, y: 3, type: 0 },
    { x: 2, y: 3, type: 0 },
    { x: 3, y: 3, type: 0 },
  ],
};
