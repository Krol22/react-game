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
    // 2.1. count enemies new positions,
    // 2.2. check collision on new positions,
    // 2.3. if collision with player damage player,

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

  dispatch(changePosition(newPosition));
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

    return;
  },
);
