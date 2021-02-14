import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { loadLevel } from "./gameSlice";
import { Level } from "./Level";

import level0 from "./data/newMap1.json";

const GameWindowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: black;
  position: relative;
  transform-origin: top left;

  left: 50%;
  top: 50%;
  ${({ scale = 1, width, height }) => `
    height: ${height}px;
    width: ${width}px;
    transform:
      translateX(${-width * scale * 0.5}px)
      translateY(${-height * scale * 0.5}px)
      scale(${scale});
  `}

   &::before {
    content: " ";
    display: block;
    width: 100%;
    height: calc(100% - 5px);
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(
        rgba(18, 16, 16, 0) 50%,
        rgba(0, 0, 0, 0.25) 50%
      ),
      linear-gradient(
        90deg,
        rgba(255, 0, 0, 0.06),
        rgba(0, 255, 0, 0.02),
        rgba(0, 0, 255, 0.06)
      );
    z-index: 2000000;
    background-size: 100% 0.5rem, 5px 100%;
    opacity: 0;
    pointer-events: none;
  }
`;

const GameWindow = ({ width = 1200, height = 800, children }) => {
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

  }, [width, height]);


  return (
    <GameWindowContainer scale={scale} width={width} height={height}>
      {children}
    </GameWindowContainer>
  );
};

GameWindow.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export const Game = () => {
  const dispatch = useDispatch();
  const { loaded, isLoading } = useSelector((state) => state.game);

  useEffect(() => {
    dispatch(loadLevel(level0));
  }, [dispatch]);

  return (
    <GameWindow width="1200" height="800">
      {(loaded && !isLoading) && <><Level /></>}
    </GameWindow>
  );
};
