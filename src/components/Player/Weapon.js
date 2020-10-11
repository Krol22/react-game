import React from "react";
import styled from "styled-components";
import Position from "../Position";
import Sprite from "../Sprite";

import sword from "../../assets/Sword.png";

const WeaponWrapper = styled.div`
  ${Position} {
    transition: transform 0.1s ease-in-out;
  }

  & ${Sprite} {
    transform-origin: 50% 100%;
  }
`;

const Weapon = ({ x, y, flip, offsetX, offsetY, angle }) => {
  return (
    <WeaponWrapper>
      <Position x={x} y={y}>
        <Sprite
          src={sword}
          width={8}
          height={21}
          z={1}
          offsetX={offsetX + 12}
          offsetY={offsetY + 2}
          angle={flip * angle}
        />
      </Position>
    </WeaponWrapper>
  );
};

export default Weapon;
