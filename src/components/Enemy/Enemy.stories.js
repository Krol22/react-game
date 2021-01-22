import React from "react";

import { Imp } from "./Imp";
import { Mage } from "./Mage";
import { Skeleton } from "./Skeleton";
import { Ogre } from "./Ogre";

export default {
  title: "game/Enemy",
  argTypes: {
    state: {
      control: {
        type: "select",
        options: ["IDLE", "DEAD", "HIT", "MOVE", "ATTACK"],
      }
    },
    facing: {
      control: {
        type: "select",
        options: ["TOP", "BOTTOM", "LEFT", "RIGHT"],
      }
    }
  }
};

const ImpTemplate = (props) => {
  return (
    <Imp {...props} />
  );
};

export const ImpEnemy = ImpTemplate.bind({});

ImpEnemy.args = {
  x: 12,
  y: 15,
  state: "IDLE",
};

const MageTemplate = (props) => {
  return (
    <Mage {...props} />
  );
};

export const MageEnemy = MageTemplate.bind({});

MageEnemy.args = {
  x: 11,
  y: 25,
  state: "IDLE",
};

const SkeletonTemplate = (props) => {
  return (
    <Skeleton {...props} />
  );
};

export const SkeletonEnemy = SkeletonTemplate.bind({});

SkeletonEnemy.args = {
  x: 11,
  y: 25,
  state: "ATTACK",
  facing: "BOTTOM",
};

const OgreTemplate = (props) => {
  return (
    <Ogre {...props} />
  );
};

export const OgreEnemy = OgreTemplate.bind({});

OgreEnemy.args = {
  x: 10,
  y: 24,
  state: "IDLE",
};
