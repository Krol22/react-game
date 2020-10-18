import React from "react";
import styled from "styled-components";

import Position from "../Game/Position";
import Sprite from "../Game/Sprite";

import sword from "../../assets/Sword.png";

const WeaponWrapper = styled.div`
  position: absolute;

  & ${Sprite} {
    transform-origin: 50% 100%;
  }
`;

const Weapon = ({ x, y, flip, offsetX, offsetY, angle }) => {
  return (
    <WeaponWrapper>
      <Sprite
        src={sword}
        width={8}
        height={21}
        z={1}
        offsetX={offsetX + 12}
        offsetY={offsetY + 2}
        angle={flip * angle}
      />
    </WeaponWrapper>
  );
};

export default Weapon;
