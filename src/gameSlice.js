import { createSlice } from "@reduxjs/toolkit";

import { ENTITY_TYPE, ENTITY_STATE } from "./constants";

import level from "./data/level0.js";

const initialState = {
  tick: false,
  map: level.map,
  entities: level.entities,
};

const gameSlice = createSlice({
  initialState,
  name: "game",
  reducers: {
    changeState: (state, { payload }) => {
      const { entityId, newState } = payload;

      const entity = state.entities[entityId];
      entity.state = newState;
    },
    idle: (state, { payload }) => {
      const entity = state.entities[payload];

      entity.state = ENTITY_STATE.IDLE;
    },
    changePosition: (state, { payload }) => {
      // I could add playerId in a state
      const player = Object.values(state.entities).find(({ entityType }) => entityType === ENTITY_TYPE.PLAYER);

      player.x = payload.x;
      player.y = payload.y;
    },
    changeFacing: (state, { payload }) => {
      const { moveDir, entityId } = payload;
      const entity = state.entities[entityId];

      entity.moveDir = moveDir;
    },
    moveEntityOnMap: (state, { payload }) => {
      const { newPosition, entityId, size = 1 } = payload;
      const { tiles } = state.map;

      if (size === 1) {
        const currentMapElement = tiles.find(({ entityId: mapEntityId }) => entityId === mapEntityId);
        delete currentMapElement.entityId;

        const newMapElement = tiles.find(({ x, y }) => newPosition.x === x && newPosition.y === y);
        newMapElement.entityId = entityId;
        return;
      }
    },
    damageEntity: (state, { payload }) => {
      const { damage, entityId } = payload;

      const entity = state.entities[entityId];

      const newHealth = entity.currentHealth - damage;
      entity.currentHealth = newHealth < 0 ? 0 : newHealth;

      if (entity.currentHealth > 0) {
        entity.state = ENTITY_STATE.HIT;
        return;
      }

      // remove entity from map
      const mapTile = state.map.tiles.find(({ entityId }) => entityId === entity.id);
      mapTile.entityId = null;
      
      entity.state = ENTITY_STATE.DEAD;
      entity.active = false;
    },
    changeEnemiesPositions: (state, { payload }) => {
      payload.forEach(({ id, position }) => {
        const { tiles } = state.map;

        const currentMapElement = tiles.find(({ entityId: mapEntityId }) => id === mapEntityId);
        currentMapElement.entityId = null;

        const newMapElement = tiles.find(({ x, y }) => position.x === x && position.y === y);
        newMapElement.entityId = id;

        const enemy = state.entities[id];
        enemy.x = position.x;
        enemy.y = position.y;
      }); 
    },
    updateStateAfterEnemyAction: (state, { payload }) => {
      const { tiles, localEntities } = payload;

      state.map.tiles = [...tiles];
      state.entities = {...localEntities};
    },
    idleEnemies: (state) => {
      const { entities } = state;

      const enemiesToUpdate = Object.values(entities).filter(({ entityType, state }) => state === ENTITY_STATE.MOVE && entityType === ENTITY_TYPE.ENEMY);

      enemiesToUpdate.forEach(enemy => {
        enemy.state = ENTITY_STATE.IDLE;
      });
    },
    updateEnemiesPositions: (state, { payload }) => {
      payload.forEach(({ id, x, y }) => {
        const enemy = state.entities[id];

        enemy.x = x;
        enemy.y = y;
      });
    },

    startTick: (state) => {
      state.tick = true;
    },
    endTick: (state) => {
      state.tick = false;
    }
  },
});

export const {
  idle,
  changePosition,
  changeState,
  changeFacing,
  moveEntityOnMap,
  changeEnemiesPositions,
  damageEntity,
  updateStateAfterEnemyAction,
  updateEnemiesPositions,
  idleEnemies,
  startTick,
  endTick,
} = gameSlice.actions;

export default gameSlice.reducer;
