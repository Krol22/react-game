import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Map from "./components/Map/Map";
import Player from "./components/Player/Player";

const Wrapper = styled.div`
  position: relative;
`;

export const PlayScene = () => {
  const { player, map } = useSelector((state) => state.game);

  return (
    <Wrapper>
      <Player {...player} />
      <Map map={map} />
    </Wrapper>
  );
};
