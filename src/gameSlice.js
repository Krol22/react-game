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
    updateEntity: (state, { payload }) => {
      const { entityId, ...rest } = payload;

      state.entities[entityId] = {
        ...state.entities[entityId],
        ...rest,
      };
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
    damageEntity: (state, { payload }) => {
      const { damage, entityId } = payload;

      const entity = state.entities[entityId];

      const newHealth = entity.attributes.health.current - damage;
      entity.attributes.health.current = newHealth < 0 ? 0 : newHealth;

      if (entity.attributes.health.current > 0) {
        entity.state = ENTITY_STATE.HIT;
        return;
      }

      entity.state = ENTITY_STATE.DEAD;
      entity.active = false;
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
    hideEntity: (state, { payload }) => {
      const entity = state.entities[payload];
      entity.visible = false;
    },
    addNewEntity: (state, { payload }) => {
      state.entities[payload.id] = payload;
    },
    toggleSpikes: (state) => {
      Object
        .values(state.entities)
        .filter(({ entityType }) => entityType === ENTITY_TYPE.SPIKE)
        .forEach(entity => {
          entity.state = entity.state === ENTITY_STATE.SHOW ? ENTITY_STATE.HIDE : ENTITY_STATE.SHOW; 
        });
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
  damageEntity,
  updateEntity,
  updateStateAfterEnemyAction,
  idleEnemies,
  idlePlayer,
  hideEntity,
  startTick,
  endTick,
  addNewEntity,
  pickupItemByPlayer,
  toggleSpikes,
} = gameSlice.actions;

export default gameSlice.reducer;
