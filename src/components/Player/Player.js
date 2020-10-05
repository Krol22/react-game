import React from "react";

import Position from "../Position";
import Sprite from "../Sprite";

import playerSprite from "../../assets/Player.png";

const Player = () => {
  return (
    <Position x={1} y={1}>
      <Sprite
        src={playerSprite}
        width={16}
        height={16}
        z={10}
        offsetX={6}
        offsetY={8}
      />
    </Position>
  );
};

export default Player;
