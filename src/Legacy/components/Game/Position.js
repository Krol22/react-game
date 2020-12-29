import styled from "styled-components";

const Position = styled.div`
  position: absolute;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;

  transition: all 0.5s ease-in-out;
`;
    
export default Position;
