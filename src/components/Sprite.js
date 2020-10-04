import styled from "styled-components";

const Sprite = styled.img`
  image-rendering: pixelated;
  object-fit: none;

  ${({ width }) => `width: ${width}px;`}
  ${({ height }) => `height: ${height}px;`}
  ${({ frame = 0, width }) => `object-position: ${frame * -width}px 0;`}
`;

export default Sprite;
