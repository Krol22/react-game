import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";

import crateSprite from "../../assets/Crate.png";

import { ENTITY_STATE, TILE_HEIGHT_HALF, TILE_WIDTH_HALF } from "../../constants";
import { Node } from "../Node/Node";
import { Sprite } from "../Sprite/Sprite";

const hitAnimation = (nodeRef) => {
  const sprite = nodeRef.current.querySelectorAll("#sprite");

  gsap.to(sprite, { filter: "grayscale(1) invert(1) brightness(100)", duration: .1 });
};

const CrateContainer = styled(Node)`
  transition: opacity .2s steps(4) .2s;
  opacity: 1;
  ${({fogged}) => fogged && `opacity: 0;`}
`;

export const Crate = React.memo(({ x, y, zIndex, state, visible, fogged }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    if (state === ENTITY_STATE.HIT) {
      hitAnimation(nodeRef);    
    }
  }, [nodeRef, state]);

  return (
    <CrateContainer
      x={x}
      y={y}
      zIndex={zIndex}
      ref={nodeRef}
      visible={visible}
      fogged={fogged}
    >
      <Sprite
        src={crateSprite}
        id="sprite"
        width={17}
        height={15}
        node={{
          y: TILE_HEIGHT_HALF / 2 - 9,
          x: TILE_WIDTH_HALF / 2 + 2,
        }}
      />
    </CrateContainer>
  )
});
