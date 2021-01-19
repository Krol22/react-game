import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ENTITY_TYPE, ENTITY_STATE } from "./constants";
import { collisionCheck, COLLISION_TYPE } from "./helpers/collisionCheck";
import { weapons } from "./components/Weapons/Weapons";

const getDirectionString = (moveDir) => {
  if (moveDir.x < 0) {
    return "LEFT";
  }

  if (moveDir.x > 0) {
    return "RIGHT";
  }

  if (moveDir.y < 0) {
    return "TOP";
  }

  if (moveDir.y > 0) {
    return "BOTTOM";
  }
};

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
      { x: 3, y: 1, type: 0 },
      { x: 4, y: 1, type: 0 },
      { x: 5, y: 1, type: 0 },
      { x: 0, y: 2, type: 0 },
      { x: 1, y: 2, type: 0 },
      { x: 2, y: 2, type: 0, entityId: 4 },
      { x: 3, y: 2, type: 0 },
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
    ],
  },
  entities: [
    {
      id: 1,
      x: 0,
      y: 0,
      state: "idle",
      weapon: "sword",
      facing: "left",
      currentHealth: 3,
      maxHealth: 3,
      entityType: ENTITY_TYPE.PLAYER,
    },
    { 
      id: 2,
      x: 2, 
      y: 4, 
      type: "IMP",
      currentHealth: 1,
      maxHealth: 1,
      entityType: ENTITY_TYPE.ENEMY,
      state: ENTITY_STATE.IDLE,
    },
    { 
      id: 3,
      x: 3, 
      y: 4, 
      type: "MAGE",
      currentHealth: 2,
      maxHealth: 2,
      entityType: ENTITY_TYPE.ENEMY,
      state: ENTITY_STATE.IDLE,
    },
    { 
      id: 4,
      x: 2, 
      y: 2, 
      type: "SKELETON",
      currentHealth: 2,
      maxHealth: 2,
      entityType: ENTITY_TYPE.ENEMY,
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

export const movePlayer = createAsyncThunk(
  "game/movePlayer",
  (direction, { getState, dispatch, rejectWithValue }) => {
    const { entities, map } = getState().game;

    const player = entities.find(({ entityType }) => entityType === ENTITY_TYPE.PLAYER);

    if (player.state !== "idle") {
      return rejectWithValue(false);
    }

    const newPosition = {
      x: player.x + (direction.x || 0),
      y: player.y + (direction.y || 0),
    };

    const {
      type: collisionType,
      entityId: collidedEntityId,
    } = collisionCheck(entities, map, newPosition);

    const moveDir = getDirectionString(direction);

    dispatch(changeFacing({
      moveDir,
      entityId: player.id,
    }));

    if (collisionType === COLLISION_TYPE.MAP) {
      return rejectWithValue(false);
    }

    if (collisionType === COLLISION_TYPE.ENEMY) {
      const { attributes } = weapons[player.weapon];

      dispatch(damageEntity({
        entityId: collidedEntityId,
        damage: attributes.damage,
      }));

      return rejectWithValue(false);
    }

    setTimeout(() => {
      dispatch(idle());
    }, 400);

    dispatch(moveEntityOnMap({
      newPosition,
      entityId: player.id,
    }));

    /* 
      Small timeout gives time for gsap to move player to new position.
      It fixes blink player sprite on new position before movement animation,
    */
    setTimeout(() => {
      dispatch(changePosition(newPosition));
    }, 10);
  },
);

const gameSlice = createSlice({
  initialState,
  name: "game",
  reducers: {
    idle: (state) => {
      const player = state.entities.find(({ entityType }) => entityType === ENTITY_TYPE.PLAYER);

      player.state = "idle";
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
        return;
      }

      // remove entity from map
      const mapTile = state.map.tiles.find(({ entityId }) => entityId === entity.id);
      delete mapTile.entityId;
      
      entity.state = ENTITY_STATE.DEAD;
    },
  },
  extraReducers: {
    [movePlayer.fulfilled]: (state) => {
      const player = state.entities.find(({ entityType }) => entityType === ENTITY_TYPE.PLAYER);
      player.state = "move";
    },
  },
});

export const {
  idle,
  changePosition,
  changeFacing,
  moveEntityOnMap,
  damageEntity,
} = gameSlice.actions;

export default gameSlice.reducer;
