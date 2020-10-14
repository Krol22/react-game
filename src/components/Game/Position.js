import styled from "styled-components";

const Position = styled.div`
  position: absolute;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
`;
    
export default Position;
