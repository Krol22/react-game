import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { loadLevel } from "./gameSlice";
import { Level } from "./Level";

import level0 from "./data/newMap1.json";

const GameWindowContainer = styled.div`
  display: flex;
  height: 1100px;
  width: 1100px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: black;
  position: relative;
  transform-origin: top left;

  left: 50%;
  top: 50%;
  ${({ scale = 1 }) => `
    transform:
      translateX(${-1100 * scale * 0.5}px)
      translateY(${-1100 * scale * 0.5}px)
      scale(${scale})
  `}
`;

const GameWindow = ({ width = 1100, height = 1100, children }) => {
  const gameWindowRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const onResize = () => {
      const maxWidth = window.innerWidth;
      const maxHeight = window.innerHeight;

      let newScale = 1;
      if (maxWidth > maxHeight) {
        newScale = maxHeight / height; 
      } else {
        newScale = maxWidth / width; 
      }

      setScale(newScale);
    };

    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };

  }, [gameWindowRef, width, height]);


  return (
    <GameWindowContainer ref={gameWindowRef} scale={scale}>
      {children}
    </GameWindowContainer>
  );
};

export const Game = () => {
  const dispatch = useDispatch();
  const { loaded, isLoading } = useSelector((state) => state.game);

  useEffect(() => {
    dispatch(loadLevel(level0));
  }, [dispatch]);

  return (
    <GameWindow>
      {(loaded && !isLoading) && (<Level />)}
    </GameWindow>
  );
};
