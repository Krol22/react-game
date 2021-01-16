import React from "react";

import { Player } from "./Player";

export default {
  title: "game/Player",
  argTypes: {
    weapon: {
      control: {
        type: "select",
        options: ["sword", "hammer"],
      },
    },
    state: {
      control: {
        type: "select",
        options: ["idle", "test", "attack", "move"],
      }
    },
    moveDir: {
      control: {
        type: "select",
        options: ["TOP", "BOTTOM", "LEFT", "RIGHT"],
      }
    }
  },
};

const PlayerTemplate = ({ x, y, weapon, state, moveDir }) => {
  return (
    <Player x={x} y={y} weapon={weapon} state={state} moveDir={moveDir} />
  );
};

export const PlayerEntity = PlayerTemplate.bind({});

PlayerEntity.args = {
  x: 20,
  y: 20,
  weapon: "sword",
  state: "idle",
  moveDir: "TOP",
};
