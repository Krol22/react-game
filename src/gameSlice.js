import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ENTITY_TYPE, ENTITY_STATE } from "./constants";

import { pickables } from "./components/Pickables/Pickables";
import { parseLevel } from "./helpers/parseLevel";

const initialState = {
  tick: false,
  isLoading: false,
  loaded: false,
  entities: {},
  camera: {
    x: 0,
    y: 0,
  },
};

export const loadLevel = createAsyncThunk(
  "game/loadLevel",
  (level) => {
    const gameLevel = parseLevel(level);

    return gameLevel;
  },
);

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
    idlePlayer: (state) => {
      const player = Object.values(state.entities).find(({ entityType }) => entityType === ENTITY_TYPE.PLAYER);

      player.state = ENTITY_STATE.IDLE;
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
    changeFog: (state, { payload }) => {
      const lightPosition = payload;

      const { tiles } = state.map;

      tiles.map(tile => tile.fogged = true);

      for(let xOffset = -3; xOffset < 4; xOffset++) {
        for(let yOffset = -3; yOffset < 4; yOffset++) {
          if (Math.abs(xOffset) + Math.abs(yOffset) >= 4) {
            continue;
          } 

          const tile = tiles.find(({ x, y }) => lightPosition.x + xOffset === x && lightPosition.y + yOffset === y);

          if (!tile) {
            continue;
          }

          tile.fogged = false;
        }
      }
    },
    damageEntity: (state, { payload }) => {
      const { damage, entityId } = payload;

      const entity = state.entities[entityId];

      const newHealth = entity.attributes.health.current - damage;
      entity.attributes.health.current = newHealth < 0 ? 0 : newHealth;

      if (entity.attributes.health.current > 0) {
        entity.state = ENTITY_STATE.HIT;
        return;
      }

      // remove entity from map
      // const mapTile = state.map.tiles.find(({ entityId }) => entityId === entity.id);
      // mapTile.entityId = null;
      //
      // entity.state = ENTITY_STATE.DEAD;
      // entity.active = false;
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
      const { localEntities } = payload;

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
    hideEntity: (state, { payload }) => {
      const entity = state.entities[payload];
      entity.visible = false;
    },
    spawnItemFromCrate: (state, { payload }) => {
      const { item, crate } = payload;
      const { tiles } = state.map;

      state.entities[item.id] = item;

      const currentMapElement = tiles.find(({ entityId }) => entityId === crate.id);
      currentMapElement.entityId = item.id;
    },
    pickupItemByPlayer: (state, { payload }) => {
      const { itemId, playerId } = payload;

      const item = state.entities[itemId];
      const player = state.entities[playerId];

      const { action } = pickables[item.name];
      const { name, change } = action;

      if (name === "CHANGE_ATTRIBUTE") {
        Object.keys(change).forEach(attribute => {
          const { min, max, current } = player.attributes[attribute];

          const newValue = change[attribute] + current;
          
          if (newValue > max) {
            player.attributes[attribute].current = max;
            return;
          }

          if (newValue < min) {
            player.attributes[attribute].current = min;
            return;
          }

          player.attributes[attribute].current = newValue;
        });
      }
    },
    startTick: (state) => {
      state.tick = true;
    },
    endTick: (state) => {
      state.tick = false;
    },
  },
  extraReducers: {
    [loadLevel.pending]: (state) => {
      state.isLoading = true;
      state.loaded = false;
    },
    [loadLevel.fulfilled]: (state, { payload }) => {
      const { entities } = payload;

      state.entities = {...entities};

      state.isLoading = false;
      state.loaded = true;
    },
  },
});

export const {
  idle,
  changePosition,
  changeState,
  changeFacing,
  changeFog,
  damageEntity,
  updateStateAfterEnemyAction,
  idleEnemies,
  idlePlayer,
  hideEntity,
  startTick,
  endTick,
  spawnItemFromCrate,
  pickupItemByPlayer,
} = gameSlice.actions;

export default gameSlice.reducer;
