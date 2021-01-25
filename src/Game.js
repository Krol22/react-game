import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Camera } from "./components/Camera/Camera";
import { Map } from "./components/Map/Map";
import { Player } from "./components/Player/Player";
import { Crate } from "./components/Crate/Crate";
import { EnemiesContainer } from "./components/Enemy/EnemiesContainer";
import { mapToIsometric } from "./helpers/mapToIsometric";
import useInputManager from "./hooks/useInputManager";
import usePlayerInput from "./components/Player/usePlayerInput";

import { ENTITY_TYPE } from "./constants";
import {Pickable} from "./components/Pickables/Pickable";

const Wrapper = styled.div`
  position: relative;
`;

const UI = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
`;

export const Game = () => {
  useInputManager();
  usePlayerInput();

  const { player, map, enemies, crates, pickables } = useSelector((state) => {
    const player = Object.values(state.game.entities).find(({ entityType }) => entityType === ENTITY_TYPE.PLAYER);
    const enemies = Object.values(state.game.entities).filter(({ entityType }) => entityType === ENTITY_TYPE.ENEMY);
    const crates = Object.values(state.game.entities).filter(({ entityType }) => entityType === ENTITY_TYPE.CRATE);
    const pickables = Object.values(state.game.entities).filter(({ entityType }) => entityType === ENTITY_TYPE.PICKABLE);

    return {
      player,
      enemies,
      crates,
      pickables,
      map: state.game.map,
    };
  });

  return (
    <>
      <UI>
        {player.attributes.health.current}
      </UI>
      <Wrapper>
        <Camera>
          <Player {...mapToIsometric(player)} />
          <Map map={map} />
          <EnemiesContainer enemies={enemies} />
          {crates.map(mapToIsometric).map(props => <Crate {...props} />)}
          {pickables.map(mapToIsometric).map(props => <Pickable {...props} />)}
        </Camera>
      </Wrapper>
    </>
  );
};
