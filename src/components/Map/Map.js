import React from "react";

import { DirtTile } from "./DirtTile";

import { mapToIsometric } from "../../helpers/mapToIsometric";

const mapToComponent = (tile => {
  return {
    ...tile,
    Component: DirtTile,
  };
});

const isMapEqual = (prevMap, newMap) => {
  // TODO: for now;
  return true;
};

export const Map = ({ map }) => {
  return (
    <>
      {map
        .map(mapToIsometric)
        .map(mapToComponent)
        .map(
          ({ Component, ...rest }) => (
            <Component {...rest} />
          ))}
    </>
  )
};
