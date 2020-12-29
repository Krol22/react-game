import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Node } from "../Node";

const HealthBarContainer = styled.div`
  position: relative;
  background-color: red;
  width: 16px;
  height: 2px;

  &:before {
    display: block;
    content: "";
    position: absolute;
    height: 2px;
    background-color: green;
    ${({currentHealth, maxHealth}) =>
      `width: ${16 * currentHealth / maxHealth}px;`
    }
  }
`;

export function HealthBar({ currentHealth, maxHealth, node }) {
  return (
    <Node {...node}>
      <HealthBarContainer
        currentHealth={currentHealth}
        maxHealth={maxHealth}
      />
    </Node>
  );
};

HealthBar.propTypes = {
  currentHealth: PropTypes.number.isRequired,
  maxHealth: PropTypes.number.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
};
