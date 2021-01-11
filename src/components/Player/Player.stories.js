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
        options: ["idle", "test", "attack"],
      }
    }
  },
};

const PlayerTemplate = ({ x, y, weapon, state }) => {
  return (
    <Player x={x} y={y} weapon={weapon} state={state} />
  );
};

export const PlayerEntity = PlayerTemplate.bind({});

PlayerEntity.args = {
  x: 20,
  y: 20,
  weapon: "sword",
  state: "idle"
};
