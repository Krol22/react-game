import { ENTITY_TYPE } from "../constants";

export const COLLISION_TYPE = {
  PLAYER: "PLAYER",
  ENEMY: "ENEMY",
  MAP: "MAP",
  CRATE: "CRATE",
  PICKABLE: "PICKABLE",
};

export const collisionCheck = (entities, tiles, newPos) => {
  const mapElement = tiles[newPos.y][newPos.x];

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

  // crate
  if (entity.entityType === ENTITY_TYPE.CRATE) {
    return {
      type: COLLISION_TYPE.CRATE,
      entityId: entity.id,
    };
  }

  // item
  if (entity.entityType === ENTITY_TYPE.PICKABLE) {
    return {
      type: COLLISION_TYPE.PICKABLE,
      entityId: entity.id,
    };
  }
};
