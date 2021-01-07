import React from "react";

import { HealthBar } from "./HealthBar";

export default {
  title: "game/HealthBar",
};

const HealthBarTemplate = ({
  currentHealth,
  maxHealth,
}) => {
  const node = {
    x: 10,
    y: 10,
  };

  return (
    <HealthBar
      currentHealth={currentHealth}
      maxHealth={maxHealth}
      node={node}
    />
  );
};

export const HealthBarEntity = HealthBarTemplate.bind({});

HealthBarEntity.args = {
  currentHealth: 75,
  maxHealth: 100,
};

