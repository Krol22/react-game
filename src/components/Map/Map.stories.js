import React from "react";

import { Node } from "../Node";
import { MapContainer } from "./Map";

export default {
  title: "game/Map",
}
const MapTemplate = ({ map }) => (
  <Node x={40} y={20}>
    <MapContainer map={map} />
  </Node>
);

export const MapEntity = MapTemplate.bind({});
MapEntity.args = {
  map: [
    { x: 0, y: 0, type: "0" },
    { x: 1, y: 0, type: "0" },
    { x: 0, y: 1, type: "0" },
    { x: 1, y: 1, type: "0" },
  ],
};
