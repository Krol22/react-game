export const getDirectionString = (moveDir) => {
  if (moveDir.x < 0) {
    return "LEFT";
  }

  if (moveDir.x > 0) {
    return "RIGHT";
  }

  if (moveDir.y < 0) {
    return "TOP";
  }

  if (moveDir.y > 0) {
    return "BOTTOM";
  }
};
