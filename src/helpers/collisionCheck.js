export const collisionCheck = (map, newPos) => {
  /* Check map bounds */
  /* TODO move 3 to constants */
  if (newPos.x < 0 || newPos.x > 5 || newPos.y < 0 || newPos.y > 5) {
    return "MAP";
  }

  const mapElement = map.find(({x, y}) => newPos.x === x && newPos.y === y);

  if (mapElement.type === 1) {
    return "MAP";
  }
};
