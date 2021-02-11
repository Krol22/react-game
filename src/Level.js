import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

import { Camera } from "./components/Camera/Camera";
import { Map } from "./components/Map/Map";
import { PlayerContainer } from "./components/Player/Player";
import { Crate } from "./components/Crate/Crate";
import { EnemiesContainer } from "./components/Enemy/EnemiesContainer";
import { PlayerHealthBar } from "./components/UI/PlayerHealthBar.js/PlayerHealthBar";
import { mapToIsometric } from "./helpers/mapToIsometric";
import useInputManager from "./hooks/useInputManager";
import usePlayerInput from "./components/Player/usePlayerInput";
import { idlePlayer } from "./gameSlice";

import { ENTITY_TYPE } from "./constants";
import {Pickable} from "./components/Pickables/Pickable";

const Wrapper = styled.div`
  position: absolute;
  opacity: .4;

  ${({ loaded }) => loaded && 'opacity: 1'};

  transition: opacity 1s steps(4);
  transform: scale(4);
`;

const UI = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  z-index: 10000;
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
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

const HealthBarContainer = styled.div`
  display: flex;
`;

const GoldContainer = styled.div`
  font-size: 30px;
`;

const getVisibleTiles = (tiles, lightSources = {}) => {
  const visibleTiles = {};

  Object.values(lightSources).forEach(({ x, y, fov }) => {
    for (let i = -fov; i <= fov; i++) {
      for (let j = -fov; j <= fov; j++) {
        const newX = x + j;
        const newY = y + i;

        if (newX < 0 || newY < 0) {
          continue;
        }
        
        visibleTiles[`${x + j}-${y + i}`] = 1;
      }
    }
  });

  return visibleTiles;
};

const selectGameEntities = createSelector(
  state => ({ game: state.game, map: state.map }),
  ({ game, map }) => {
    const { tiles, lightSources } = map;

    const visibleTiles = getVisibleTiles(tiles, lightSources);
    const visibleEntities = Object.values(game.entities).map((entity) => { 
      const { x, y } = entity;

      if (visibleTiles[`${x}-${y}`]) {
        return {
          ...entity,
          fogged: false,
        };
      }
      return entity;
    });

    const player = visibleEntities.find(({ entityType }) => entityType === ENTITY_TYPE.PLAYER);
    const enemies = visibleEntities.filter(({ entityType }) => entityType === ENTITY_TYPE.ENEMY);
    const crates = visibleEntities.filter(({ entityType }) => entityType === ENTITY_TYPE.CRATE);
    const pickables = visibleEntities.filter(({ entityType }) => entityType === ENTITY_TYPE.PICKABLE);

    return {
      player,
      enemies,
      crates,
      pickables,
    };
  },
);

export const Level = () => {
  const dispatch = useDispatch();

  useInputManager();
  usePlayerInput();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);

    setTimeout(() => {
      dispatch(idlePlayer());
    }, 1000);
  }, []);

  const { player, enemies, crates, pickables } = useSelector(selectGameEntities, shallowEqual);

  const { showExampleText, text } = useSelector((state) => state.ui);

  return (
    <>
      <UI>
        <Overlay />
        <TopBar>
          <HealthBarContainer style={{ transform: "scale(8)", transformOrigin: "center left" }}>
            <PlayerHealthBar {...player.attributes.health} />
          </HealthBarContainer>
          <GoldContainer>
            Gold: 0
          </GoldContainer>
        </TopBar>
        <LevelTitle loaded={loaded}>
          Hello world
        </LevelTitle>
        {showExampleText && (
          <div>
            {text}
          </div>
        )}
      </UI>
      <Wrapper loaded={loaded}>
        <Camera>
          <PlayerContainer {...mapToIsometric(player)} />
          <Map />
          <EnemiesContainer enemies={enemies} />
          {crates.map(mapToIsometric).map(props => <Crate {...props} />)}
          {pickables.map(mapToIsometric).map(props => <Pickable {...props} />)}
        </Camera>
      </Wrapper>
    </>
  );
};
