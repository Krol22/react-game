import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ENTITY_TYPE,
  ENTITY_STATE,
  GAME_ACTION,
  STEP_TIME_MS,
} from "~/constants";

import { weapons } from "~/components/Weapons/Weapons";
import delay from "~/helpers/asyncDelay";
import { collisionCheck, COLLISION_TYPE } from "~/helpers/collisionCheck";
import { getDirectionString } from "~/helpers/getDirectionString";
import { throttledDispatch } from "~/helpers/throttledDispatch";
import { padActions } from "~/slices/game/padActions";

import {
  moveEntityOnMap,
  updateMapState,
  spawnEntity,
  removeEntityFromMap,
  moveLightSource,
} from "~/slices/map/mapSlice";
import { changeCameraPosition } from "~/slices/camera/cameraSlice";

import {
  changePosition,
  changeState,
  changeFacing,
  damageEntity,
  addNewEntity,
  idleEnemies,
  hideEntity,
  startTick,
  endTick,
  updateEntity,
  updateStateAfterEnemyAction,
  pickupItemByPlayer,
  toggleSpikes,
} from "~/gameSlice";

import { skeletonBehaviour } from "./skeletonBehaviour";

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

  throttledDispatch(
    400,
    idleEnemies(),
  );
};

const damageEnemyByPlayer = async (dispatch, player, entities, enemyId) => {
    const { attributes } = weapons[player.weapon];

    const currentHealth = entities[enemyId].attributes.health.current;

    dispatch(changeState({
      entityId: player.id,
      newState: ENTITY_STATE.ATTACK,
    }));

    await delay(200);

    dispatch(damageEntity({
      entityId: enemyId,
      damage: attributes.damage,
    }));

    if (currentHealth > attributes.damage) {
      throttledDispatch(
        100,
        changeState({
          entityId: enemyId,
          newState: ENTITY_STATE.IDLE,
        }),
      );
    } else {
      const enemy = entities[enemyId];
      dispatch(removeEntityFromMap({ x: enemy.x, y: enemy.y }));
    }

    throttledDispatch(
      200,
      changeState({
      entityId: player.id,
      newState: ENTITY_STATE.IDLE,
      }),
    );
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

  const crate = entities[collidedEntityId];

  setTimeout(() => {
    dispatch(hideEntity(collidedEntityId));
    spawnEntityFromCrate(dispatch, crate)
  }, 100);

  throttledDispatch(
    200,
    changeState({
      entityId: player.id,
      newState: ENTITY_STATE.IDLE,
    }),
  );
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

  dispatch(addNewEntity(newItem));
  dispatch(spawnEntity({ position: { x, y }, entityId: id }));
};

const pickupItem = async (player, pickedItemId) => {
  throttledDispatch(
    300,
    changeState({
      entityId: pickedItemId,
      newState: ENTITY_STATE.PICK,
    }),
    pickupItemByPlayer({
      itemId: pickedItemId,
      playerId: player.id,
    }),
  );

  throttledDispatch(
    800,
    hideEntity(pickedItemId),
  );
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

  dispatch(moveLightSource({
    id: 0,
    x: newPosition.x,
    y: newPosition.y,
  }));

  dispatch(updateEntity({
    entityId: player.id,
    state: ENTITY_STATE.MOVE,
    x: newPosition.x,
    y: newPosition.y,
  }));

  dispatch(changeCameraPosition(newPosition));

  throttledDispatch(
    400, 
    changeState({
      entityId: player.id,
      newState: ENTITY_STATE.IDLE,
    }),
  );
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
    pickupItem(player, collidedEntityId); 
  }

  if (collisionType === COLLISION_TYPE.SPIKE) {
    dispatch(
      damageEntity({
        entityId: player.id,
        damage: 1,  
      })
    );
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

    dispatch(toggleSpikes());

    switch (name) {
      case GAME_ACTION.PLAYER_SKIP:
        // dispatch(damageEntity({
          // entityId: player.id,
          // damage: 1,
        // }))
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
