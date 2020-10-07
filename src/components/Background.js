import React from "react";
import styled from "styled-components";

import RainDrop from "./effects/Rain";

const NUMBER_OF_RAINDROPS = 30;

const BackgroundWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const renderRainDrop = (index) => {
  const randomX = Math.round(Math.random() * 100);

  return <RainDrop key={index} initialX={randomX} />;
};

const Background = () => {
  return (
    <BackgroundWrapper>
      {Array.from(Array(NUMBER_OF_RAINDROPS)).map((_, index) => renderRainDrop(index))}
    </BackgroundWrapper>
  );
};

export default React.memo(Background);
