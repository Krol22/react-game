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

const PlayerTemplate = ({ weapon, state }) => {
  return (
    <Player x={20} y={20} weapon={weapon} state={state} />
  );
};

export const PlayerEntity = PlayerTemplate.bind({});

PlayerEntity.args = {
  weapon: "sword",
  state: "attack"
};
