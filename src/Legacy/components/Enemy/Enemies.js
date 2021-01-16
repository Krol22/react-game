import React from "react";
import { useSelector } from "react-redux";

import Imp from "./Imp";

const Enemies = () => {
  const enemies = useSelector((state) => state.game.enemies)

  return (<>
    {enemies.map(enemy => (
        <Imp key={enemy.id} {...enemy} />
      ))}
  </>);
}

export default Enemies;
