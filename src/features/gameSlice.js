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
  {x: 1, y: 0},
  {x: -1, y: 0},
];

const initialState = {
  playerActionTime: 500,
  worldActionTime: 500,
  tick: 0,
  map: [
    { x: 0, y: 0, type: "ENEMY" },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 0, y: 1, type: "PLAYER" },
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
      health: 100,
    },
    {
      state: "IDLE",
      id: 1,
      x: 1, 
      y: 0,
      health: 100,
    },
  ],
  player: {
    x: 0,
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
        const enemy = state.enemies.find(({ x, y }) => newPos.x === x && newPos.y === y);
        enemy.state = "HIT";
      }

    },
    idle: (state) => {
      state.player.playerState = playerStates.IDLE;
    },
    enemyHit: ({ enemies }, { payload }) => {
      enemies
        .find(enemy => enemy.id === payload)
        .health -= 20;
    },
    skipTurn: (state) => {
      state.shouldTick = true;
      state.skipTurn = true;
    },
    tick: (state) => {
      state.tick += 1;
    },
    endTick: (state) => {
      state.shouldTick = false;
      state.skipTurn = false;
      state.playerActionTime = 500;
      state.worldActionTime = 500;
    },
    changeState: ({ enemies }, { payload }) => {
      enemies
        .find(enemy => enemy.id === payload.id)
        .state = payload.state;
    },
    move: (state, { payload }) => {
      const position = tickMoves[Math.floor((Math.random() * 4))];

      const enemy = state.enemies.find(({ id }) => id === payload);

      if (!enemy) {
        return;
      }

      const prevPos = {
        y: enemy.y,
        x: enemy.x,
      };

      const newPos = {
        x: enemy.x + position.x,
        y: enemy.y + position.y,
      };

      enemy.flip = (position.x > 0 || position.y < 0) ? 1 : -1;
      enemy.direction = position;

      const collisionType = collisionCheck(state.map, newPos);

      if (!collisionType) {
        enemy.state = "MOVE";
        return;
      }

      if (collisionType === "EMPTY") {
        enemy.x = newPos.x;
        enemy.y = newPos.y;
        enemy.state = "MOVE";

        const prevElement = state.map.find(({x, y}) => prevPos.x === x && prevPos.y === y);
        const mapElement = state.map.find(({x, y}) => newPos.x === x && newPos.y === y);

        prevElement.type = "EMPTY";
        mapElement.type = "ENEMY";

        return;
      }

      if (collisionType === "PLAYER") {
        enemy.state = "ATTACK";
        state.player.playerState = "HIT";
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
  skipTurn,
  enemyHit,
} = playerSlice.actions;

export default playerSlice.reducer;
