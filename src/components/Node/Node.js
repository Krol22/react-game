import styled from "styled-components";

export const Node = styled.div`
  box-sizing: content-box;
  display: inline-block;

  ${({
    x = 0,
    y = 0,
    zIndex = 1,
    rotation = 0,
    scaleX = 1,
    scaleY = 1,
    debug = false,
    local = false,
    width = 0,
    height = 0,
  }) => `
    position: ${local ? 'relative' : 'absolute'};
    top: ${y}px;
    left: ${x}px;
    z-index: ${zIndex};
    transform:
      rotate(${rotation}deg)
      scale(${scaleX}, ${scaleY});
    transform-origin: center;
    width: ${width}px;
    height: ${height}px;

    ${debug && `background-color: red;`}
  `}
`;
