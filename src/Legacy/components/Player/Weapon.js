import React from "react";
import styled from "styled-components";

import Sprite from "../Game/Sprite";

import sword from "../../assets/Sword.png";

const WeaponWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

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
        offsetY={offsetY}
        offsetX={offsetX}
        angle={flip * angle}
      />
    </WeaponWrapper>
  );
};

export default Weapon;
