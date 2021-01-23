export const TILE_WIDTH_HALF = 15;
export const TILE_HEIGHT_HALF = 6;

export const ARROW_LEFT = 37;
export const ARROW_RIGHT = 39;
export const ARROW_UP = 38;
export const ARROW_DOWN = 40;

export const STEP_TIME_MS = 800;
export const STEP_TIME = STEP_TIME_MS / 1000;

export const ENTITY_TYPE = {
  PLAYER: "PLAYER",
  ENEMY: "ENEMY", 
};

export const ENTITY_STATE = {
  IDLE: "IDLE",
  MOVE: "MOVE",
  ATTACK: "ATTACK",
  HIT: "HIT",
  DEAD: "DEAD",
};

export const GAME_ACTION = {
  PLAYER_MOVE: "PLAYER_MOVE",
  PLAYER_SKIP: "PLAYER_SKIP",
};
