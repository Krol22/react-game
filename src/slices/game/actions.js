import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  ENTITY_TYPE,
  ENTITY_STATE,
  GAME_ACTION,
  STEP_TIME_MS,
} from "../../constants";

import { collisionCheck, COLLISION_TYPE } from "../../helpers/collisionCheck";
import { weapons } from "../../components/Weapons/Weapons";
import delay from "../../helpers/asyncDelay";
import { getDirectionString } from "../../helpers/getDirectionString";
import { skeletonBehaviour } from "./skeletonBehaviour";

import {
  changePosition,
  changeState,
  changeFacing,
  moveEntityOnMap,
  damageEntity,
  updateStateAfterEnemyAction,
  idleEnemies,
  startTick,
  endTick,
} from "../../gameSlice";

const handleEnemyAction = async (dispatch, getState) => {
  const { entities, map } = getState().game;
  const enemies = entities.filter(({ entityType, active }) => active && entityType === ENTITY_TYPE.ENEMY);
  
  // making enemies move outside redux, update map and enemyEntities after.  
  const tiles = JSON.parse(JSON.stringify(map.tiles));
  const localEntities = JSON.parse(JSON.stringify(entities));

  enemies.forEach(enemy => {
    const { type } = enemy;

    if (type === "SKELETON") {
      skeletonBehaviour(dispatch, enemy, tiles, localEntities);
      return;
    }

    if (type === "IMP") {

    }
  });

  dispatch(updateStateAfterEnemyAction({ tiles, localEntities }));

  setTimeout(() => {
    dispatch(idleEnemies());
  }, 400);
};

const damageEnemyByPlayer = async (dispatch, player, entities, collidedEntityId) => {
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
};

const movePlayer = (dispatch, player, newPosition) => {
  dispatch(moveEntityOnMap({
    newPosition,
    entityId: player.id,
  }));

  dispatch(changeState({
    entityId: player.id,
    newState: ENTITY_STATE.MOVE,
  }));

  setTimeout(() => {
    dispatch(changeState({
      entityId: player.id,
      newState: ENTITY_STATE.IDLE,
    }));
  }, 400);

  setTimeout(() => {
    dispatch(changePosition(newPosition));
  }, 10);
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
    damageEnemyByPlayer(dispatch, player, entities, collidedEntityId);
    return;
  }

  movePlayer(dispatch, player, newPosition);
};

export const step = createAsyncThunk(
  "game/step",

  async (action, { getState, dispatch }) => {
    const { name } = action;
    const state = getState();
    const { entities, tick } = state.game;

    if (tick) {
      return;
    }

    dispatch(startTick());
    setTimeout(() => {
      dispatch(endTick());
    }, STEP_TIME_MS);

    const player = entities.find(({ entityType }) => entityType === ENTITY_TYPE.PLAYER);

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

    handleEnemyAction(dispatch, getState);
    return;
  },
);
