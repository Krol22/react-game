import { createSlice } from "@reduxjs/toolkit";

import { loadLevel } from "../../gameSlice";

const mapSlice = createSlice({
  name: "map",
  initialState: {
    tiles: [], 
    lightSources: {
      0: {
        id: 0,
        x: 3,
        y: 3,
        fov: 3,
      },
    },
  },
  reducers: {
    moveEntityOnMap: (state, { payload }) => {
      const { newPosition, oldPosition, entityId } = payload;
      const { tiles } = state;

      tiles[oldPosition.y][oldPosition.x].entityId = null;
      tiles[newPosition.y][newPosition.x].entityId = entityId;
    },
    removeEntityFromMap: (state, { payload }) => {
      const { x, y } = payload;
      const { tiles } = state;

      tiles[y][x].entityId = null;
    },
    updateMapState: (state, { payload }) => {
      state.tiles = payload;
    },
    spawnEntity: (state, { payload }) => {
      const { tiles } = state;
      const { position, entityId } = payload;

      tiles[position.y][position.x].entityId = entityId;
    },
    addLightSource: (state, { payload }) => {
      const { x, y, id, fov } = payload;

      state.lightSources[id] = {
        id, x, y, fov
      };
    },
    removeLightSource: (state, { payload }) => {
      const { id } = payload;

      state.lightSources[id] = null;
    },
    moveLightSource: (state, { payload }) => {
      const { id, x, y } = payload;

      // move this to map container? 
      // would be a lot simpler...
      Object.values(state.lightSources).forEach(({ x, y, fov }) => {
        for(let i = -fov; i <= fov; i++) {
          for(let j = -fov; j <= fov; j++) {
            const newX = x + j;
            const newY = y + i;

            if (newX < 0 || newY < 0) {
              continue;
            }

            if (state.tiles[newY][newX]) {
              state.tiles[newY][newX].fogged = true;
            }
          }
        }
      });

      state.lightSources[id].x = x;
      state.lightSources[id].y = y;

      Object.values(state.lightSources).forEach(({ x, y, fov }) => {
        for(let i = -fov; i <= fov; i++) {
          for(let j = -fov; j <= fov; j++) {
            const newX = x + j;
            const newY = y + i;

            if (newX < 0 || newY < 0) {
              continue;
            }

            if (state.tiles[newY][newX]) {
              state.tiles[newY][newX].discovered = true;
              state.tiles[newY][newX].fogged = false;
            }
          }
        }
      });
    }
  },
  extraReducers: {
    [loadLevel.fulfilled]: (state, { payload }) => {
      const { map } = payload;

      state.tiles = map.tiles;

      Object.values(state.lightSources).forEach(({ x, y, fov }) => {
        for(let i = -fov; i <= fov; i++) {
          for(let j = -fov; j <= fov; j++) {
            const newX = x + j;
            const newY = y + i;

            if (newX < 0 || newY < 0) {
              continue;
            }

            if (state.tiles[newY][newX]) {
              state.tiles[newY][newX].discovered = true;
              state.tiles[newY][newX].fogged = false;
            }
          }
        }
      });

    },
  },
});

export const {
  updateMapState,
  moveEntityOnMap,
  removeEntityFromMap,
  spawnEntity,
  moveLightSource,
} = mapSlice.actions;

export default mapSlice.reducer;
