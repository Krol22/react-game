import React from "react";

import { DirtTile } from "./DirtTile";
import { WallTile } from "./WallTile";

import { mapToIsometric } from "../../helpers/mapToIsometric";

const mapToComponent = (tile => {
  const { type } = tile;

  console.log(type);

  let component;
  switch(type) {
    case 0: 
      component = DirtTile;
      break;
    case 1:
      component = WallTile;
      break;
    default:
      component = DirtTile;
  }

  return {
    ...tile,
    Component: component,
  };
}) 

export const Map = ({ map }) => {

  return (
    <>
      {map.map(mapToIsometric).map(mapToComponent).map(({ x, y, Component }) => (
        <Component x={x} y={y} />
      ))}
    </>
  )
};
