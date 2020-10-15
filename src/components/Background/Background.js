import React, { useRef, useEffect } from "react";
import styled from "styled-components";

import RainDrop from "./Rain";

import rainSprite from "../../assets/Rain.png";

const NUMBER_OF_RAINDROPS = 30;

const BackgroundWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Canvas = styled.canvas`
  border: 1px solid red;
  display: block;
`;

const renderRainDrop = (index) => {
  const randomX = Math.round(Math.random() * 100);

  return <RainDrop key={index} initialX={randomX} />;
};

const Background = () => {
  // const canvasRef = useRef();
//
  // useEffect(() => {
    // const image = new Image();
    // image.src = rainSprite;
//
    // const ctx = canvasRef.current.getContext("2d");
    // ctx.drawImage(image, 20, 20);
  // }, [canvasRef]);

  return (
    <BackgroundWrapper>
      {Array.from(Array(NUMBER_OF_RAINDROPS)).map((_, index) => renderRainDrop(index))}
    </BackgroundWrapper>
  );
};

// <Canvas ref={canvasRef} />

export default React.memo(Background);
