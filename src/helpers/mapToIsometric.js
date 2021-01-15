import { TILE_WIDTH_HALF, TILE_HEIGHT_HALF } from "../constants";

export const mapToIsometric = (element) => {
  const { x, y, z = 0 } = element;

  return {
    ...element,
    x: (x - y) * TILE_WIDTH_HALF,
    y: (x + y) * TILE_HEIGHT_HALF, 
    zIndex: x + y + z,
  };
};
