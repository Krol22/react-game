import React from "react";
import { useSelector } from "react-redux";

import Enemy from "./Enemy";

const Enemies = () => {
  const enemies = useSelector((state) => state.game.enemies)

  return (<>
    {enemies.map(enemy => (
        <Enemy key={enemy.id} {...enemy} />
      ))}
  </>);
}

export default Enemies;
