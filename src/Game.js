import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Camera } from "./components/Camera/Camera";
import { Map } from "./components/Map/Map";
import { Player } from "./components/Player/Player";
import { Crate } from "./components/Crate/Crate";
import { EnemiesContainer } from "./components/Enemy/EnemiesContainer";
import { PlayerHealthBar } from "./components/UI/PlayerHealthBar.js/PlayerHealthBar";
import { mapToIsometric } from "./helpers/mapToIsometric";
import useInputManager from "./hooks/useInputManager";
import usePlayerInput from "./components/Player/usePlayerInput";

import { ENTITY_TYPE } from "./constants";
import {Pickable} from "./components/Pickables/Pickable";

const Wrapper = styled.div`
  position: relative;

  opacity: .4;

  ${({ loaded }) => loaded && 'opacity: 1'};

  transition: opacity 1s steps(4);
  transform: scale(4);
`;

const UI = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  border: 1px solid red;
  color: white;
  z-index: 10000;
`;

const Overlay = styled.div`
  background-color: black;
  opacity: 0.2;
`;

const LevelTitle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 3rem;
  transform: translate(-50%, -50%);
  transition: top 1s ease-in-out 1.5s, opacity .5s steps(20) 1.5s;

  ${({ loaded }) => loaded && `top: -50%; opacity: 0;`};
`;

export const Game = () => {
  useInputManager();
  usePlayerInput();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);

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

  const { showExampleText, text } = useSelector((state) => state.ui);

  return (
    <>
      <UI>
        <Overlay />
        <LevelTitle loaded={loaded}>
          Hello world
        </LevelTitle>
        <div style={{ transform: "scale(8)", transformOrigin: "top left" }}>
          <PlayerHealthBar {...player.attributes.health} />
        </div>
        {showExampleText && (
          <div>
            {text}
          </div>
        )}
      </UI>
      <Wrapper loaded={loaded}>
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
