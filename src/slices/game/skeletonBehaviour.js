import { ENTITY_STATE } from "../../constants";
import { collisionCheck, COLLISION_TYPE } from "../../helpers/collisionCheck";
import { getDirectionString } from "../../helpers/getDirectionString";

import {
  changeState,
  damageEntity,
} from "../../gameSlice";

const ai = () => {
  const direction = Math.round(Math.random() * 3); 

  const directions = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
  ];

  return directions[direction];
};

export const skeletonBehaviour = (dispatch, enemy, tiles, localEntities) => {
  const { x, y } = enemy;

  const direction = ai();
  const facing = getDirectionString(direction);

  const newPosition = {
    x: x + (direction.x || 0),
    y: y + (direction.y || 0),
  };

  const { 
    type: collisionType,
    entityId: collidedEntityId,
  } = collisionCheck(localEntities, { tiles }, newPosition);

  if (collisionType === COLLISION_TYPE.PLAYER) {
    setTimeout(() => {
      dispatch(changeState({
        entityId: collidedEntityId,
        newState: ENTITY_STATE.IDLE,
      }));
    }, 100);

    const localEnemy = localEntities.find(({ id }) => id === enemy.id);
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
  const currentMapElement = tiles.find(({ entityId: mapEntityId }) => enemy.id === mapEntityId);
  currentMapElement.entityId = null;

  const newMapElement = tiles.find(({ x, y }) => newPosition.x === x && newPosition.y === y);
  newMapElement.entityId = enemy.id;

  const localEnemy = localEntities.find(({ id }) => id === enemy.id);

  localEnemy.facing = facing;
  localEnemy.state = ENTITY_STATE.MOVE;
  localEnemy.x = newPosition.x;
  localEnemy.y = newPosition.y;
};

