import React from "react";

import { PlayerHealthBar } from "./PlayerHealthBar";

export default {
  title: "ui/PlayerHealthBar",
};

const PlayerHealthBarTemplate = ({ current, max }) => {

  return (
    <PlayerHealthBar current={current} max={max} />
  );
};

export const PlayerHealthBarControl = PlayerHealthBarTemplate.bind({});

PlayerHealthBarControl.args = {
  current: 6,
  max: 8,
};
