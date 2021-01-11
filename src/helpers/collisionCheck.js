export const collisionCheck = (map, newPos) => {
  const { width, height } = map;

  /* Check map bounds */
  if (newPos.x < 0 || newPos.x > width || newPos.y < 0 || newPos.y > height) {
    return "MAP";
  }
};
