import styled, { css } from "styled-components";

export const Node = styled.div`
  box-sizing: content-box;

  ${({
    x = 0,
    y = 0,
    rotation = 0,
    scaleX = 1,
    scaleY = 1,
    debug = false,
    local = false,
    width = 0,
    height = 0,
    anchorPoint,
    zIndex,
    visible = true,
  }) => css`
    position: ${local ? 'relative' : 'absolute'};
    top: ${y}px;
    left: ${x}px;
    transform:
      rotate(${rotation}deg)
      scale(${scaleX}, ${scaleY});
    transform-origin: center;
    width: ${width}px;
    height: ${height}px;
    display: ${visible ? `inline-block` :`none`};

    ${zIndex && `z-index: ${zIndex};`}
    ${debug && `background-color: red;`}
    ${anchorPoint && `transform-origin: ${anchorPoint};`}
  `}
`;
