import styled from "styled-components";

const HealthBar = styled.div`
  width: 100%;
  height: 2px;
  position: absolute;
  background-color: red;

  &:after {
    display: block;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    background-color: green;
    width: ${({ health }) => `${health}%`};

    transition: width 0.1s steps(2);
  }
`;

export default HealthBar;
