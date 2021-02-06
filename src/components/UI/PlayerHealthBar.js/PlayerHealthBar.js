import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";

import hearthAsset from "../../../assets/Hearth.png";

const HearthComponent = styled.div`
  image-rendering: pixelated;
  image-rendering: crisp-edges;

  background: url(${hearthAsset});
  width: 7px;
  height: 6px;
  margin-left: 1px;

  ${({ fill }) => `
    background-position: ${7 * fill}px 0;
  `}
`;

const Container = styled.div`
  display: inline-flex;
`;

export const PlayerHealthBar = ({ current, max }) => {
  const numberOfHearths = max / 2;   

  const prevCurrentRef = useRef(current);
  const nodeRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({});
    console.log(nodeRef);

    if (current > prevCurrentRef.current) {
      timeline
        .to(nodeRef.current, { scale: 1.4, duration: .1 })  
        .to(nodeRef.current, { scale: 1, duration: .1 })  
    }

    if (current < prevCurrentRef.current) {
      timeline
        .to(nodeRef.current, { scale: 0.8, duration: .05 })  
        .to(nodeRef.current, { scale: 1, duration: .05 })  
    }
    
    prevCurrentRef.current = current;
  }, [current, nodeRef]);

  const items = [];

  for (let i = 0; i < numberOfHearths; i++) {
    let fill = 1;

    if (Math.floor(current / 2) > i) {
      fill = 0;
    } else if (current % 2 && Math.floor(current / 2) === i) {
      fill = 2;
    }

    items.push(<HearthComponent fill={fill}/>);
  }

  return (
    <Container ref={nodeRef}>
      {items}
    </Container>
  )
};
