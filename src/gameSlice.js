import { createSlice } from "@reduxjs/toolkit";

import { ENTITY_TYPE, ENTITY_STATE } from "./constants";

const initialState = {
  tick: 0,
  map: {
    tiles: [
      { x: 0, y: 0, type: 0, entityId: 1 },
      { x: 1, y: 0, type: 0 },
      { x: 2, y: 0, type: 0 },
      { x: 3, y: 0, type: 0 },
      { x: 4, y: 0, type: 0 },
      { x: 5, y: 0, type: 0 },
      { x: 0, y: 1, type: 0 },
      { x: 1, y: 1, type: 0 },
      { x: 2, y: 1, type: 0 },
      { x: 3, y: 1, type: 0, entityId: 6 },
      { x: 4, y: 1, type: 0 },
      { x: 5, y: 1, type: 0 },
      { x: 0, y: 2, type: 0 },
      { x: 1, y: 2, type: 0 },
      { x: 2, y: 2, type: 0, entityId: 4 },
      { x: 3, y: 2, type: 0, entityId: 5 },
      { x: 4, y: 2, type: 0 },
      { x: 5, y: 2, type: 0 },
      { x: 0, y: 3, type: 0 },
      { x: 1, y: 3, type: 0 },
      { x: 2, y: 3, type: 0 },
      { x: 3, y: 3, type: 0 },
      { x: 4, y: 3, type: 0 },
      { x: 5, y: 3, type: 0 },
      { x: 0, y: 4, type: 0 },
      { x: 1, y: 4, type: 0 },
      { x: 2, y: 4, type: 0, entityId: 2, },
      { x: 3, y: 4, type: 0, entityId: 3, },
      { x: 4, y: 4, type: 0 },
      { x: 5, y: 4, type: 0 },
      { x: 0, y: 5, type: 0 },
      { x: 2, y: 5, type: 0 },
      { x: 4, y: 5, type: 0 },
      { x: 5, y: 5, type: 0 },
      { x: 6, y: 5, type: 0 },
      { x: 5, y: 6, type: 0 },
      { x: 6, y: 6, type: 0 },
    ],
  },
  entities: [
    {
      id: 1,
      x: 0,
      y: 0,
      state: ENTITY_STATE.IDLE,
      weapon: "sword",
      facing: "left",
      currentHealth: 3,
      maxHealth: 3,
      entityType: ENTITY_TYPE.PLAYER,
      active: true,
    },
    {
      id: 2,
      x: 2,
      y: 4,
      type: "IMP",
      currentHealth: 1,
      maxHealth: 1,
      entityType: ENTITY_TYPE.ENEMY,
      active: true,
      state: ENTITY_STATE.IDLE,
    },
    // {
      // id: 3,
      // x: 3,
      // y: 4,
      // type: "MAGE",
      // currentHealth: 2,
      // maxHealth: 2,
      // entityType: ENTITY_TYPE.ENEMY,
      // active: true,
      // state: ENTITY_STATE.IDLE,
    // },
    {
      id: 4,
      x: 2,
      y: 2,
      type: "SKELETON",
      currentHealth: 2,
      maxHealth: 2,
      entityType: ENTITY_TYPE.ENEMY,
      active: true,
      state: ENTITY_STATE.IDLE,
    },
    {
      id: 5,
      x: 3,
      y: 2,
      type: "SKELETON",
      currentHealth: 2,
      maxHealth: 2,
      entityType: ENTITY_TYPE.ENEMY,
      active: true,
      state: ENTITY_STATE.IDLE,
    },
    { 
      id: 6,
      x: 3, 
      y: 1, 
      type: "SKELETON",
      currentHealth: 2,
      maxHealth: 2,
      entityType: ENTITY_TYPE.ENEMY,
      active: true,
      state: ENTITY_STATE.IDLE,
    },
    // {
      // id: 5,
      // x: 3,
      // y: 1,
      // type: "OGRE",
      // entityType: ENTITY_TYPE.ENEMY,
      // mapSize: 2,
    // },
  ],
};

const gameSlice = createSlice({
  initialState,
  name: "game",
  reducers: {
    changeState: (state, { payload }) => {
      const { entityId, newState } = payload;

      const entity = state.entities.find(({ id }) => id === entityId);
      entity.state = newState;
    },
    idle: (state, { payload }) => {
      const entity = state.entities.find(({ id }) => id === payload);

      entity.state = ENTITY_STATE.IDLE;
    },
    changePosition: (state, { payload }) => {
      const player = state.entities.find(({ entityType }) => entityType === ENTITY_TYPE.PLAYER);

      player.x = payload.x;
      player.y = payload.y;
    },
    changeFacing: (state, { payload }) => {
      const { moveDir, entityId } = payload;
      const entity = state.entities.find(({ id }) => id === entityId);

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

      const entity = state.entities.find(({ id }) => entityId === id);

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

        const enemy = state.entities.find(({ id: entityId }) => entityId === id);
        enemy.x = position.x;
        enemy.y = position.y;
      }); 
    },
    updateStateAfterEnemyAction: (state, { payload }) => {
      const { tiles, localEntities } = payload;

      state.map.tiles = [...tiles];
      state.entities = [...localEntities];
    },
    idleEnemies: (state) => {
      const { entities } = state;

      const enemiesToUpdate = entities.filter(({ entityType, state }) => state === ENTITY_STATE.MOVE && entityType === ENTITY_TYPE.ENEMY);

      enemiesToUpdate.forEach(enemy => {
        enemy.state = ENTITY_STATE.IDLE;
      });
    },
    updateEnemiesPositions: (state, { payload }) => {
      payload.forEach(({ id, x, y }) => {
        const enemy = state.entities.find(({ id: entityId }) => entityId === id);

        enemy.x = x;
        enemy.y = y;
      });
    },
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
} = gameSlice.actions;

export default gameSlice.reducer;
