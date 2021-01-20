import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Node } from "../Node";

const HealthBarContainer = styled.div`
  position: relative;
  width: ${({ size }) => size ? `${size * 16}px` : "16px"};
  height: 1px;
  background-color: #421B2E;
  border: 1px solid black;

  &:before {
    display: block;
    content: "";
    position: absolute;
    height: 1px;
    background-color: #ac3232;
    ${({currentHealth, maxHealth, size = 1}) =>
      `width: ${size * 16 * currentHealth / maxHealth}px;`
    }
  }
`;

export function HealthBar({ currentHealth, maxHealth, node, size }) {
  return (
    <Node {...node}>
      <HealthBarContainer
        currentHealth={currentHealth}
        maxHealth={maxHealth}
        size={size}
      />
    </Node>
  );
};

HealthBar.propTypes = {
  currentHealth: PropTypes.number.isRequired,
  maxHealth: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
};
