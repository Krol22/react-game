import { ENTITY_TYPE, ENTITY_STATE } from "../constants";

export const parseLevel = ({ tiles, entities }) => {
  let idCounter = 0;

  const gameEntities = {};

  entities.map((entity) => {
    const { x, y, element } = entity;

    let newEntity = {};

    // #TODO move this to some kind of loader - but with static imports!
    switch (element.name) {
      case "player": {
        newEntity = {
          id: idCounter,
          x,
          y,
          state: ENTITY_STATE.SPAWN,
          weapon: "sword",
          facing: "left",
          entityType: ENTITY_TYPE.PLAYER,
          active: true,
          visible: true,
          attributes: {
            health: {
              current: 7,
              min: 0,
              max: 10,
            },
          },
        };
        break;
      }
      case "crate": {
        newEntity = {
          id: idCounter,
          x, y,
          entityType: ENTITY_TYPE.CRATE,
          active: true,
          visible: true,
          discovered: false,
          fogged: true,
          item: {
            id: 999,
            name: "healthPotion",
          }
        };
        break;
      }
      case "skeleton": {
        newEntity = {
          id: idCounter,
          x, y,
          type: "SKELETON",
          entityType: ENTITY_TYPE.ENEMY,
          active: true,
          state: ENTITY_STATE.IDLE,
          currentStep: 0,
          visible: true,
          discovered: false,
          fogged: true,
          attributes: {
            health: {
              current: 2,
              min: 0,
              max: 2,
            },
          },
        };
        break;
      }
      case "imp": {
        newEntity = {
          id: idCounter,
          x, y,
          type: "IMP",
          entityType: ENTITY_TYPE.ENEMY,
          active: true,
          state: ENTITY_STATE.IDLE,
          currentStep: 0,
          visible: true,
          discovered: false,
          fogged: true,
          attributes: {
            health: {
              current: 1,
              min: 0,
              max: 1,
            },
          },
        };
        break;
      }
      case "spike_hide": {
        newEntity = {
          id: idCounter,
          x, y,
          type: "SPIKE",
          entityType: ENTITY_TYPE.SPIKE,
          active: true,
          state: ENTITY_STATE.HIDE,
          visible: true,
          fogged: true,
        }
        break;
      }
      case "spike_show": {
        newEntity = {
          id: idCounter,
          x, y,
          type: "SPIKE",
          entityType: ENTITY_TYPE.SPIKE,
          active: true,
          state: ENTITY_STATE.SHOW,
          visible: true,
          fogged: true,
        }
        break;
      }
      case "potion": {
        newEntity = {
          id: idCounter,
          x, y,
          type: "SPIKE",
          entityType: ENTITY_TYPE.SPIKE,
          active: true,
          state: ENTITY_STATE.SHOW,
          visible: true,
          fogged: true,
        }
        break;
      }
    };

    idCounter++;
    return newEntity;
  }).forEach(entity => {
    gameEntities[entity.id] = entity;
  });

  Object.values(gameEntities).forEach(({ id, x, y }) => {
    if (!tiles[y][x].entities) {
      tiles[y][x].entities = [];
    }

    tiles[y][x].entities.push(id);
  });

  const mappedTiles = tiles.map(row => {
    return row.map(element => element && ({ ...element, discovered: false, fogged: true }));
  });

  return {
    map: {
      tiles: mappedTiles,
    },
    entities: gameEntities,
  };
};
