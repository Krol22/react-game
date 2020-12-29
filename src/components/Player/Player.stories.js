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
  },
};

const PlayerTemplate = ({ weapon }) => {
  return (
    <Player x={20} y={20} weapon={weapon} />
  );
};

export const PlayerEntity = PlayerTemplate.bind({});

PlayerEntity.args = {
  weapon: "sword"
};
