import { ENTITY_STATE } from "../../constants";
import { collisionCheck, COLLISION_TYPE } from "../../helpers/collisionCheck";
import { getDirectionString } from "../../helpers/getDirectionString";

import {
  changeState,
  damageEntity,
} from "../../gameSlice";

const directions = [
  { x: -1, y: 0 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
];

export const skeletonBehaviour = (dispatch, enemy, tiles, localEntities) => {
  const { x, y, currentStep } = enemy;

  const direction = directions[currentStep];
  const facing = getDirectionString(direction);

  const newPosition = {
    x: x + (direction.x || 0),
    y: y + (direction.y || 0),
  };

  const localEnemy = localEntities[enemy.id];

  const { 
    type: collisionType,
    entityId: collidedEntityId,
  } = collisionCheck(localEntities, tiles, newPosition);

  if (collisionType === COLLISION_TYPE.PLAYER) {
    setTimeout(() => {
      dispatch(changeState({
        entityId: collidedEntityId,
        newState: ENTITY_STATE.IDLE,
      }));
    }, 100);

    localEnemy.state = ENTITY_STATE.ATTACK;
    localEnemy.facing = facing;

    setTimeout(() => {
      dispatch(damageEntity({
        entityId: collidedEntityId,  
        damage: 1,
      }))
    }, 100);

    setTimeout(() => {
      dispatch(changeState({
        entityId: enemy.id,  
        newState: ENTITY_STATE.IDLE,
      }));
    }, 100);

    return;
  }

  if (collisionType === COLLISION_TYPE.MAP) {
    return;
  }

  if (collisionType === COLLISION_TYPE.ENEMY) {
    return;
  }

  /* move enemy */
  const currentMapElement = tiles[localEnemy.y][localEnemy.x];
  currentMapElement.entityId = null;

  const newMapElement = tiles[newPosition.y][newPosition.x];
  newMapElement.entityId = enemy.id;

  localEnemy.facing = facing;
  localEnemy.state = ENTITY_STATE.MOVE;
  localEnemy.x = newPosition.x;
  localEnemy.y = newPosition.y;
  localEnemy.currentStep = currentStep === 3 ? 0 : currentStep + 1
};

