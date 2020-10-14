import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Position from "../Game/Position";
import Sprite from "../Game/Sprite";
import HealthBar from "./HealthBar";
import useMove from "../useMove";
import useEnemyAttack from "./useEnemyAttack";

import { changeState, move, enemyHit } from "../../features/gameSlice";
import { mapToIsometric } from "../../helpers/mapToIsometric";

import enemySprite from "../../assets/Enemy.png";

const EnemyWrapper = styled.div`
  ${Position} {
    transition: all 0.5s ease-in-out;
  }

  ${Sprite} {
    transition: 
      top 0.2s ease-in-out,
      left 0.2s ease-in-out,
      transform 0.1s ease-in-out;
  }

  ${({ state }) => state === "IDLE" && `
    transform: translateY(0);
    animation-name: idle;  
    animation-duration: 0.3s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  `}

  ${({ state }) => state === "HIT" && `
    ${Sprite} {
      animation-name: hit;
      animation-duration: 0.1s;
      animation-delay: 0.3s;
      animation-timing-function: linear;
    }
  `}
`;

const Enemy = ({ id, x, y, health, flip, state, direction }) => {
  const dispatch = useDispatch();
  const idle = useCallback(() => {
    dispatch(changeState("IDLE"));
  }, [dispatch])
  const tick = useSelector((state) => state.game.tick);

  useEffect(() => {
    if (!tick) { return; }
    dispatch(move());
  }, [dispatch, tick]);

  const [offsetY, jump] = useMove(idle, "enemy");
  const {left, top} = mapToIsometric(x, y);
  const [attackOffsetX, attackOffsetY, playAttack] = useEnemyAttack(idle); 

  useEffect(() => {
    if (state === "MOVE") {
      jump();
    }

    if (state === "ATTACK") {
      playAttack(direction);
    }

    if (state === "HIT") {
      setTimeout(() => {
        dispatch(enemyHit());
        idle();
      }, 400);
    }

    return () => {};
  }, [jump, state]);

  return (
    <EnemyWrapper state={state}>
      <Position x={left + 8} y={top + 6}>
        <HealthBar health={health} offsetY={0}/>
        <Sprite
          src={enemySprite}
          width={16}
          height={16}
          z={1}
          offsetX={attackOffsetX}
          offsetY={attackOffsetY + offsetY}
          flipX={flip}
        />
      </Position>
    </EnemyWrapper>
  );
};

export default Enemy;
