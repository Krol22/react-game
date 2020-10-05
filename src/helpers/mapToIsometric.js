import { TILE_WIDTH_HALF, TILE_HEIGHT_HALF } from "../constants";

export const mapToIsometric = (x, y) => {
  return {
    left: (x - y) * TILE_WIDTH_HALF,
    top: (x + y) * TILE_HEIGHT_HALF, 
  };
};
