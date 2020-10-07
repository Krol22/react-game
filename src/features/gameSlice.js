import { createSlice } from "@reduxjs/toolkit";

export const playerStates = {
  IDLE: "IDLE",
  MOVE: "MOVE",
  ATTACK: "ATTACK",
  HIT_WALL: "HIT_WALL",
};

const tickMoves = [
  {x: 0, y: -1},
  {x: 0, y: 1},
];

const initialState = {
  tick: 0,
  map: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 0, y: 3 },
    { x: 1, y: 3 },
    { x: 2, y: 3 },
    { x: 3, y: 3 },
  ],
  enemies: [
    {
      state: "IDLE",
      id: 0,
      x: 0, 
      y: 0,
    },
  ],
  player: {
    x: 1,
    y: 1,
    flip: 1,
    playerState: playerStates.IDLE,
  }
};

const collisionCheck = (map, position) => {
  const element = map.find(({x, y, type}) => position.x === x && position.y === y);

  if (!element) {
    return false;
  }

  if (!element.type) {
    return "EMPTY";
  }
  
  return element.type;
}

const playerSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    movePlayer: (state, { payload }) => {
      state.player.flip = (payload.x > 0 || payload.y < 0) ? 1 : -1;
      state.shouldTick = true;

      const newPos = {
        y: state.player.y + (payload.y || 0),
        x: state.player.x + (payload.x || 0),
      };

      const prevPos = {
        y: state.player.y,
        x: state.player.x,
      };

      const collisionType = collisionCheck(state.map, newPos);

      if (!collisionType) {
        state.player.playerState = playerStates.MOVE;
        return;
      }

      if (collisionType === "EMPTY") {
        state.player = {
          ...state.player,
          ...newPos,
          playerState: playerStates.MOVE,
        };

        const prevElement = state.map.find(({x, y}) => prevPos.x === x && prevPos.y === y);
        const mapElement = state.map.find(({x, y}) => newPos.x === x && newPos.y === y);

        prevElement.type = "EMPTY";
        mapElement.type = "PLAYER";

        return;
      }

      if (collisionType === "ENEMY") {
        state.player.playerState = playerStates.ATTACK;
      }

    },
    idle: (state) => {
      state.player.playerState = playerStates.IDLE;
    },
    tick: (state) => {
      state.tick += 1;
    },
    endTick: (state) => {
      state.shouldTick = false;
    },
    changeState: ({ enemies }, payload) => {
      enemies[0].state = payload;
    },
    move: (state) => {
      const position = tickMoves[state.tick % 2];

      const prevPos = {
        y: state.enemies[0].y,
        x: state.enemies[0].x,
      };

      const newPos = {
        x: state.enemies[0].x + position.x,
        y: state.enemies[0].y + position.y,
      };

      state.enemies[0].flip = (position.x > 0 || position.y < 0) ? 1 : -1;

      const collisionType = collisionCheck(state.map, newPos);

      if (!collisionType) {
        state.enemies[0].state = "MOVE";
        return;
      }

      if (collisionType === "EMPTY") {
        state.enemies[0] = {
          ...state.enemies[0],
          ...newPos,
          state: "MOVE",
        };

        const prevElement = state.map.find(({x, y}) => prevPos.x === x && prevPos.y === y);
        const mapElement = state.map.find(({x, y}) => newPos.x === x && newPos.y === y);

        prevElement.type = "EMPTY";
        mapElement.type = "ENEMY";

        return;
      }

      if (collisionType === "PLAYER") {
        state.enemies[0].state = "MOVE";
      }
    },
  }
});

export const {
  idle,
  move,
  tick,
  endTick,
  changeState,
  movePlayer,
} = playerSlice.actions;

export default playerSlice.reducer;
