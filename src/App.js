import React from "react";
import styled from "styled-components";

import Game from "./Game";

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <Wrapper>
      <Game />
    </Wrapper>
  );
}

export default App;
