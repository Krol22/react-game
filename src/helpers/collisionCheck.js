import { ENTITY_TYPE } from "../constants";

export const COLLISION_TYPE = {
  PLAYER: "PLAYER",
  ENEMY: "ENEMY",
  MAP: "MAP",
  CRATE: "CRATE",
  PICKABLE: "PICKABLE",
  SPIKE: "SPIKE",
};

export const collisionCheck = (entities, tiles, newPos) => {
  const mapElement = tiles[newPos.y][newPos.x];

  // no tile
  if (!mapElement) {
    return [{
      type: COLLISION_TYPE.MAP,
    }];
  }

  // wall
  if (mapElement.type === 1) {
    return [{
      type: COLLISION_TYPE.MAP,
    }];
  }

  if (!mapElement.entities) {
    return [];
  }

  const mapTileEntities = mapElement.entities.map(entityId => entities[entityId]);
  // const entity = entities[mapElement.entityId];

  // no collision
  if (!mapTileEntities.length) {
    return [];
  }

  const collisions = [];

  mapTileEntities.forEach(entity => {
    if (entity.entityType === ENTITY_TYPE.ENEMY) {
      collisions.push({
        type: COLLISION_TYPE.ENEMY,
        entityId: entity.id,
      });

      return;
    }

    // player
    if (entity.entityType === ENTITY_TYPE.PLAYER) {
      collisions.push({
        type: COLLISION_TYPE.PLAYER,
        entityId: entity.id,
      });

      return;
    }

    // crate
    if (entity.entityType === ENTITY_TYPE.CRATE) {
      collisions.push({
        type: COLLISION_TYPE.CRATE,
        entityId: entity.id,
      });

      return;
    }

    // item
    if (entity.entityType === ENTITY_TYPE.PICKABLE) {
      collisions.push({
        type: COLLISION_TYPE.PICKABLE,
        entityId: entity.id,
      });

      return;
    }

    // spike
    if (entity.entityType === ENTITY_TYPE.SPIKE) {
      collisions.push({
        type: COLLISION_TYPE.SPIKE,
        entityId: entity.id,
      });

      return;
    }
  });

  return collisions;
};
