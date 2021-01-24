import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Camera } from "./components/Camera/Camera";
import { Map } from "./components/Map/Map";
import { Player } from "./components/Player/Player";
import { EnemiesContainer } from "./components/Enemy/EnemiesContainer";
import { mapToIsometric } from "./helpers/mapToIsometric";
import useInputManager from "./hooks/useInputManager";
import usePlayerInput from "./components/Player/usePlayerInput";

import { ENTITY_TYPE } from "./constants";

const Wrapper = styled.div`
  position: relative;
`;

export const Game = () => {
  useInputManager();
  usePlayerInput();

  const { player, map, enemies } = useSelector((state) => {
    const player = Object.values(state.game.entities).find(({ entityType }) => entityType === ENTITY_TYPE.PLAYER);
    const enemies = Object.values(state.game.entities).filter(({ entityType }) => entityType === ENTITY_TYPE.ENEMY);

    return {
      player,
      enemies,
      map: state.game.map,
    };
  });

  return (
    <Wrapper>
      <Camera>
        <Player {...mapToIsometric(player)} />
        <Map map={map} />
        <EnemiesContainer enemies={enemies} />
      </Camera>
    </Wrapper>
  );
};
