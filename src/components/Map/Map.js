import React from "react";
import { useSelector } from "react-redux";

import { DirtTile } from "./DirtTile";

import { mapToIsometric } from "../../helpers/mapToIsometric";

const mapToComponent = (tile => {
  return {
    ...tile,
    zIndex: tile.zIndex - 1,
    Component: DirtTile,
  };
});

export const Map = () => {
  const { tiles } = useSelector((state) => state.map);

  return (
    <>
      {tiles
        .flat()
        .flat()
        .filter(element => element) 
        .map(mapToIsometric)
        .map(mapToComponent)
        .map(
          ({ Component, x, y, zIndex, offset, discovered, fogged }) => (
            <Component x={x} y={y} zIndex={zIndex} discovered={discovered} fogged={fogged} offset={offset} />
          ))}
    </>
  )
};

