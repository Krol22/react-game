import React from "react";

import { DirtTile } from "./DirtTile";
import { mapToIsometric } from "../../helpers/mapToIsometric";

export const MapContainer = ({ map }) => {
  return (
    <>
      {map.map(mapToIsometric).map(({ x, y }) => (
        <DirtTile x={x} y={y} />
      ))}
    </>
  )
};
