import React from "react";

import { Player } from "./Player";

export default {
  title: "game/Player",
};

const PlayerTemplate = () => {
  return (
    <Player x={20} y={20} />
  );
};

export const PlayerEntity = PlayerTemplate.bind({});

PlayerEntity.args = {};
