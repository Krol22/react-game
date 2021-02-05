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
import { padActions } from "../game/padActions";

import { moveEntityOnMap, updateMapState } from "../map/mapSlice";

import {
  changePosition,
  changeState,
  changeFacing,
  damageEntity,
  spawnItemFromCrate,
  idleEnemies,
  hideEntity,
  startTick,
  endTick,
  updateStateAfterEnemyAction,
  pickupItemByPlayer,
} from "../../gameSlice";

import { changeCameraPosition } from "../camera/cameraSlice";

const handleEnemyAction = async (dispatch, getState) => {
  const { entities } = getState().game;
  const { tiles } = getState().map;

  const enemies = Object.values(entities).filter(({ entityType, active }) => active && entityType === ENTITY_TYPE.ENEMY);
  
  // making enemies move outside redux, update map and enemyEntities after.  
  const tilesCopy = JSON.parse(JSON.stringify(tiles));
  const localEntities = JSON.parse(JSON.stringify(entities));

  enemies.forEach(enemy => {
    const { type } = enemy;

    if (type === "SKELETON") {
      skeletonBehaviour(dispatch, enemy, tilesCopy, localEntities);
      return;
    }

    if (type === "IMP") {

    }
  });

  dispatch(updateStateAfterEnemyAction({ localEntities }));
  dispatch(updateMapState(tilesCopy))

  setTimeout(() => {
    dispatch(idleEnemies());
  }, 400);
};

const damageEnemyByPlayer = async (dispatch, player, entities, collidedEntityId) => {
    const { attributes } = weapons[player.weapon];

    const currentHealth = entities[collidedEntityId].attributes.health.current;

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

const destroyCrate = async (dispatch, player, entities, collidedEntityId) => {
  dispatch(changeState({
    entityId: player.id,
    newState: ENTITY_STATE.ATTACK,
  }));

  await delay(200);

  dispatch(changeState({
    entityId: collidedEntityId,
    newState: ENTITY_STATE.HIT,
  }));

  setTimeout(() => {
    dispatch(hideEntity(collidedEntityId));
    const crate = entities[collidedEntityId];
    spawnEntityFromCrate(dispatch, crate)
  }, 100);

  setTimeout(() => {
    dispatch(changeState({
      entityId: player.id,
      newState: ENTITY_STATE.IDLE,
    }));

  }, 200);
};

const spawnEntityFromCrate = async (dispatch, crate) => {
  const { x, y, item } = crate;

  const { id, name } = item;

  const newItem = {
    id,
    x,
    y,
    name,
    entityType: ENTITY_TYPE.PICKABLE,
    active: true,
    visible: true,
    state: ENTITY_STATE.SPAWN,
  };

  dispatch(spawnItemFromCrate({
    item: newItem,
    crate,
  }));
};

const pickupItem = async (dispatch, player, collidedEntityId) => {
  setTimeout(() => {
    dispatch(changeState({
      entityId: collidedEntityId,
      newState: ENTITY_STATE.PICK,
    }));

    dispatch(pickupItemByPlayer({ itemId: collidedEntityId, playerId: player.id }));
  }, 300);

  setTimeout(() => {
    dispatch(hideEntity(collidedEntityId));
  }, 800);
};

const handlePadScripts = (dispatch, player, newPosition, tiles) => {
  const currentPositionTile = tiles[player.y][player.x];
  const newPositionTile = tiles[newPosition.y][newPosition.x];

  try {
    if (currentPositionTile.action?.onLeave) {
      const action = currentPositionTile.action.onLeave;

      const { ref, args } = action;

      dispatch(padActions[ref](args));
    }

    if (newPositionTile.action?.onEnter) {
      const action = newPositionTile.action.onEnter;

      const { ref, args } = action;
      dispatch(padActions[ref](args));
    }
  } catch (e) {
    console.error(e);
  }
};

const movePlayer = (dispatch, player, newPosition) => {
  dispatch(moveEntityOnMap({
    newPosition,
    oldPosition: {
      x: player.x,
      y: player.y,
    },
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
    dispatch(changeCameraPosition(newPosition));
    // dispatch(changeFog(newPosition));
  }, 10);
};

const handlePlayerMove = async (dispatch, state, player, action) => {
  const { entities } = state.game; 
  const { tiles } = state.map;
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
  } = collisionCheck(entities, tiles, newPosition);

  if (collisionType === COLLISION_TYPE.MAP) {
    return;
  }

  if (collisionType === COLLISION_TYPE.ENEMY) {
    damageEnemyByPlayer(dispatch, player, entities, collidedEntityId);
    return;
  }

  if (collisionType === COLLISION_TYPE.CRATE) {
    destroyCrate(dispatch, player, entities, collidedEntityId);
    return;
  }

  if (collisionType === COLLISION_TYPE.PICKABLE) {
    pickupItem(dispatch, player, collidedEntityId); 
  }

  setTimeout(() => {
    handlePadScripts(dispatch, player, newPosition, tiles);
  }, 200);

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

    const player = Object.values(entities).find(({ entityType }) => entityType === ENTITY_TYPE.PLAYER);

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
