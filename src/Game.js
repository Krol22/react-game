import React, { useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { movePlayer } from "./gameSlice";

import { Node } from "./components/Node/Node";
import { Map } from "./components/Map/Map";
import { Player } from "./components/Player/Player";
import { mapToIsometric } from "./helpers/mapToIsometric";

const Wrapper = styled.div`
  position: relative;
`;

export const Game = () => {
  const { player, map } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const move = useCallback((dir) => {
    dispatch(movePlayer(dir));
  }, [])

  return (
    <Wrapper>
      <Player {...mapToIsometric(player)} />
      <Map map={map} />
      <Node y={40}>
        <div onClick={() => move({ x: 1, y: 0 })}>RIGHT</div>
        <div onClick={() => move({ x: -1, y: 0 })}>LEFT</div>
        <div onClick={() => move({ x: 0, y: 1 })}>BOTTOM</div>
        <div onClick={() => move({ x: 0, y: -1 })}>TOP</div>
      </Node>
    </Wrapper>
  );
};
