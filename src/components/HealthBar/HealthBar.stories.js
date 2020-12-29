import React from "react";

import { HealthBar } from "./HealthBar";

export default {
  title: "game/HealthBar",
};

const HealthBarTemplate = ({
  currentHealth,
  maxHealth,
}) => {
  return (
    <HealthBar
      x={10}
      y={10}
      currentHealth={currentHealth}
      maxHealth={maxHealth}
    />
  );
};

export const HealthBarEntity = HealthBarTemplate.bind({});

HealthBarEntity.args = {
  currentHealth: 75,
  maxHealth: 100,
};

