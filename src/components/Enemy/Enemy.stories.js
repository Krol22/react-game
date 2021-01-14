import React from "react";

import { Enemy } from "./Enemy";
import { Enemy2 } from "./Enemy2";
import { Enemy3 } from "./Enemy3";
import { Boss1 } from "./Boss1";

export default {
  title: "game/Enemy",
};

const EnemyTemplate = ({ x, y }) => {
  return (
    <Enemy x={x} y={y} />
  );
};

export const EnemyEntity = EnemyTemplate.bind({});

EnemyEntity.args = {
  x: 10,
  y: 10,
};

const Enemy2Template = ({ x, y }) => {
  return (
    <Enemy2 x={x} y={y} />
  );
};

export const Enemy2Entity = Enemy2Template.bind({});

Enemy2Entity.args = {
  x: 10,
  y: 10,
};

const Enemy3Template = ({ x, y }) => {
  return (
    <Enemy3 x={x} y={y} />
  );
};

export const Enemy3Entity = Enemy3Template.bind({});

Enemy3Entity.args = {
  x: 10,
  y: 10,
};

const Boss1Template = ({ x, y }) => {
  return (
    <Boss1 x={x} y={y} />
  );
};

export const Boss1Entity = Boss1Template.bind({});

Boss1Entity.args = {
  x: 10,
  y: 10,
};
