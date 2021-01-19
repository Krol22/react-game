import React from "react";
import PropTypes from "prop-types";

import { Imp } from "./Imp";
import { Mage } from "./Mage";
import { Skeleton } from "./Skeleton";
import { Ogre } from "./Ogre";

import { mapToIsometric } from "../../helpers/mapToIsometric";

const EnemyTypes = {
  IMP: Imp,
  MAGE: Mage,
  SKELETON: Skeleton,
  OGRE: Ogre,
};

const mapToComponent = (enemy) => ({
  ...enemy,
  Component: EnemyTypes[enemy.type],
});

export function EnemiesContainer({ enemies }) {
  return (
    <>
      {enemies
        .map(mapToIsometric)
        .map(mapToComponent)
        .map(({ Component, ...rest }) => (
          <Component {...rest} />
        )
      )}
    </>
  ) 
}

EnemiesContainer.propTypes = {
  enemies: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  })),
}
