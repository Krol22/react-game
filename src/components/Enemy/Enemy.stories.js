import React from "react";

import { Imp } from "./Imp";
import { Mage } from "./Mage";
import { Skeleton } from "./Skeleton";
import { Ogre } from "./Ogre";

export default {
  title: "game/Enemy",
};

const ImpTemplate = ({ x, y }) => {
  return (
    <Imp x={x} y={y} />
  );
};

export const ImpEnemy = ImpTemplate.bind({});

ImpEnemy.args = {
  x: 12,
  y: 15,
};

const MageTemplate = ({ x, y, state }) => {
  return (
    <Mage x={x} y={y} state={state} />
  );
};

export const MageEnemy = MageTemplate.bind({});

MageEnemy.args = {
  x: 11,
  y: 25,
  state: "DEAD",
};

const SkeletonTemplate = ({ x, y }) => {
  return (
    <Skeleton x={x} y={y} />
  );
};

export const SkeletonEnemy = SkeletonTemplate.bind({});

SkeletonEnemy.args = {
  x: 11,
  y: 25,
};

const OgreTemplate = ({ x, y }) => {
  return (
    <Ogre x={x} y={y} />
  );
};

export const OgreEnemy = OgreTemplate.bind({});

OgreEnemy.args = {
  x: 10,
  y: 24,
};
