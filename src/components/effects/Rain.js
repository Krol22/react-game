import React from "react";
import styled from "styled-components";

import Sprite from "../Sprite";

import rainSprite from "../../assets/Rain.png";

const RainDropWrapper = styled.div`
  position: absolute;
  animation: drop 2s infinite;

  opacity: 1;
  transition: bottom ease-in-out;
  bottom: 110%;

  ${({ x }) => `left: ${x}%;`}
  ${({ delay }) => `animation-delay: ${delay}s`};

  z-index: 10;

  @keyframes drop {
    0% {
      bottom: 100%;
    }
    100% {
      opacity: 0;
      bottom: -10px;
      transform: translateX(-50px);
    }
  }
`;

const RainDrop = ({ initialX }) => {
  const delay = Math.random() * 2;

  return (
    <RainDropWrapper x={initialX} delay={delay}>
      <Sprite
        width={3}
        height={6}
        src={rainSprite}
      />
    </RainDropWrapper>
  )
};

export default RainDrop;
