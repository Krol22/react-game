import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Map } from "./components/Map/Map";
import { Player } from "./components/Player/Player";
import { mapToIsometric } from "./helpers/mapToIsometric";

import useInputManager from "./hooks/useInputManager";

const Wrapper = styled.div`
  position: relative;
`;

export const Game = () => {
  useInputManager();

  const { player, map } = useSelector((state) => state.game);

  return (
    <Wrapper>
      <Player {...mapToIsometric(player)} />
      <Map map={map} />
    </Wrapper>
  );
};
