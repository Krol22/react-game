import { ENTITY_TYPE } from "../constants";

export const COLLISION_TYPE = {
  PLAYER: "PLAYER",
  ENEMY: "ENEMY",
  MAP: "MAP",
};

export const collisionCheck = (entities, map, newPos) => {
  const { tiles } = map;

  const mapElement = tiles.find(({x, y}) => newPos.x === x && newPos.y === y);

  // no tile
  if (!mapElement) {
    return {
      type: COLLISION_TYPE.MAP,
    };
  }

  // wall
  if (mapElement.type === 1) {
    return {
      type: COLLISION_TYPE.MAP,
    };
  }

  const entity = entities[mapElement.entityId];

  // no collision
  if (!entity) {
    return false;
  }

  // enemy
  if (entity.entityType === ENTITY_TYPE.ENEMY) {
    return {
      type: COLLISION_TYPE.ENEMY,
      entityId: entity.id,
    };
  }

  // player
  if (entity.entityType === ENTITY_TYPE.PLAYER) {
    return {
      type: COLLISION_TYPE.PLAYER,
      entityId: entity.id,
    };
  }
};
