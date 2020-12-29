import styled from "styled-components";

const Sprite = styled.img`
  image-rendering: pixelated;
  object-fit: none;
  position: absolute;

  ${({ width }) => `width: ${width}px;`}
  ${({ height }) => `height: ${height}px;`}
  ${({ z = 0 }) => `z-index: ${z};`}
  ${({ frame = 0, width }) => `object-position: ${frame * -width}px 0;`}
  ${({
    flipX = 1,
    angle = 0,
  }) => `
    transform: scaleX(${flipX}) rotate(${angle}deg);
  `}

  ${({ offsetX = 0, offsetY = 0}) => `
    left: ${offsetX}px;
    top: ${offsetY}px;
  `}
`;

export default Sprite;
