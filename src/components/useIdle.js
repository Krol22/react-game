import { useState, useRef, useCallback } from "react";
import { css } from "styled-components";

const useIdle = (frames) => {
  // I wonder if it's big mistake.

  let frameCounter = 0;
  const [frame, setFrame] = useState(0);
  const intervalRef = useRef();

  const play = useCallback(() => {
    intervalRef.current = setInterval(() => {
      const frameNumber = frameCounter >= frames ? 0 : frameCounter + 1;

      frameCounter = frameNumber;
      setFrame(frameNumber);
    }, 200)
  }, [frames]);

  const pause = () => {
    setFrame(0);
    clearInterval(intervalRef.current);
  };

  return [frame, play, pause];
};

export const idleAnimation = css`
  animation-duration: 0.3s;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

export default useIdle
