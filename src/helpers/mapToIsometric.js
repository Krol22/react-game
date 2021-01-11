import { TILE_WIDTH_HALF, TILE_HEIGHT_HALF } from "../constants";

export const mapToIsometric = (element) => {
  const { x, y } = element;
  return {
    ...element,
    x: (x - y) * TILE_WIDTH_HALF,
    y: (x + y) * TILE_HEIGHT_HALF, 
  };
};
