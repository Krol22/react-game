import { createAsyncThunk } from "@reduxjs/toolkit";

import { ENTITY_TYPE, ENTITY_STATE } from "../../constants";
import { collisionCheck, COLLISION_TYPE } from "../../helpers/collisionCheck";
import { weapons } from "../../components/Weapons/Weapons";
import delay from "../../helpers/asyncDelay";

import {
  changePosition,
  changeState,
  changeFacing,
  moveEntityOnMap,
  damageEntity,
  updateStateAfterEnemyAction,
  idleEnemies,
  updateEnemiesPositions,
} from "../../gameSlice";

export const GAME_ACTION = {
  PLAYER_MOVE: "PLAYER_MOVE",
  PLAYER_SKIP: "PLAYER_SKIP",
};

  // check player state if not idle -> return; *
  // 1. check action *
    // 1.1. MOVE, *
    // 1.1.1. check new position, *
    // 1.1.2. handle collision, *
    // 1.1.3. react to collision, *
    // 1.2. SKIP, *
    // 1.2.1. do nothing, *
  // 2. for each enemy: 
    // 2.1. count enemies new positions, *
    // 2.2. check collision on new positions, *
    // 2.3. if collision with player damage player,

// VERY PROFESIONAL AI
const ai = () => {
  const direction = Math.round(Math.random() * 4); 

  const directions = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: 0, y: 0 },
  ];

  return directions[direction];
};

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

const handleEnemyMove = async (dispatch, getState) => {
  const { entities, map } = getState().game;
  const enemies = entities.filter(({ entityType, active }) => active && entityType === ENTITY_TYPE.ENEMY);
  
  const tiles = JSON.parse(JSON.stringify(map.tiles));
  const localEntities = JSON.parse(JSON.stringify(entities));
  const newPositions = [];

  enemies.forEach(enemy => {
    const { x, y } = enemy;

    const direction = ai();

    const newPosition = {
      x: x + (direction.x || 0),
      y: y + (direction.y || 0),
    };

  
    // we need to have updated versions of entities and mapTiles for enemy to calculate his new position correctly

    const { 
      type: collisionType,
      // entityId: collidedEntityId,
    } = collisionCheck(localEntities, { tiles }, newPosition);

    if (collisionType === COLLISION_TYPE.PLAYER) {
      // DO SOMETHING
      return;
    }

    if (collisionType === COLLISION_TYPE.MAP) {
      return;
    }

    if (collisionType === COLLISION_TYPE.ENEMY) {
      return;
    }

    newPositions.push({
      id: enemy.id,
      position: newPosition,
    });

    const currentMapElement = tiles.find(({ entityId: mapEntityId }) => enemy.id === mapEntityId);
    currentMapElement.entityId = null;

    const newMapElement = tiles.find(({ x, y }) => newPosition.x === x && newPosition.y === y);
    newMapElement.entityId = enemy.id;

    const localEnemy = localEntities.find(({ id }) => id === enemy.id);

    newPositions.push({ id: enemy.id, x: newPosition.x, y: newPosition.y });

    const facing = getDirectionString(direction);

    localEnemy.facing = facing;
    localEnemy.state = ENTITY_STATE.MOVE;
  });

  dispatch(updateStateAfterEnemyAction({ tiles, localEntities }));
  dispatch(updateEnemiesPositions(newPositions));

  setTimeout(() => {
    dispatch(idleEnemies());
  }, 400);
};

const handlePlayerMove = async (dispatch, state, player, action) => {
  const { entities, map } = state.game; 
  const { direction } = action;

  const newPosition = {
    x: player.x + (direction.x || 0),
    y: player.y + (direction.y || 0),
  };

  const moveDir = getDirectionString(direction);

  dispatch(changeFacing({
    moveDir,
    entityId: player.id,
  }));

  const {
    type: collisionType,
    entityId: collidedEntityId,
  } = collisionCheck(entities, map, newPosition);

  if (collisionType === COLLISION_TYPE.MAP) {
    return;
  }

  if (collisionType === COLLISION_TYPE.ENEMY) {
    const { attributes } = weapons[player.weapon];

    const { currentHealth } = entities.find(({ id }) => collidedEntityId === id);

    dispatch(changeState({
      entityId: player.id,
      newState: ENTITY_STATE.ATTACK,
    }));

    await delay(200);

    dispatch(damageEntity({
      entityId: collidedEntityId,
      damage: attributes.damage,
    }));

    if (currentHealth > attributes.damage) {
      setTimeout(() => {
        dispatch(changeState({
          entityId: collidedEntityId,
          newState: ENTITY_STATE.IDLE,
        }));
      }, 100);
    }

    setTimeout(() => {
      dispatch(changeState({
        entityId: player.id,
        newState: ENTITY_STATE.IDLE,
      }));
    }, 200);

    return;
  }

  setTimeout(() => {
    dispatch(changeState({
      entityId: player.id,
      newState: ENTITY_STATE.IDLE,
    }));
  }, 400);

  dispatch(moveEntityOnMap({
    newPosition,
    entityId: player.id,
  }));

  dispatch(changeState({
    entityId: player.id,
    newState: ENTITY_STATE.MOVE,
  }));

  setTimeout(() => {
    dispatch(changePosition(newPosition));
  }, 10);
};

export const step = createAsyncThunk(
  "game/step",

  async (action, { getState, dispatch }) => {
    const { name } = action;
    const state = getState();
    const { entities } = state.game;

    const player = entities.find(({ entityType }) => entityType === ENTITY_TYPE.PLAYER);

    if (player.state !== ENTITY_STATE.IDLE) {
      return;
    }

    switch (name) {
      case GAME_ACTION.PLAYER_SKIP:
        // literally do nothing.
        break;
      case GAME_ACTION.PLAYER_MOVE:
        handlePlayerMove(dispatch, state, player, action);
        break;
      default:
        break;
    }

    await delay(400);

    handleEnemyMove(dispatch, getState);
    return;
  },
);
