import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Position from "../Position";
import Sprite from "../Sprite";
import useMove from "../useMove";

import { changeState, move } from "../../features/gameSlice";
import { mapToIsometric } from "../../helpers/mapToIsometric";

import enemySprite from "../../assets/Enemy.png";

const EnemyWrapper = styled.div`
  ${Position} {
    transition: all 0.5s ease-in-out;
  }

  ${Sprite} {
    transition: top 0.2s ease-in-out, transform 0.1s ease-in-out;
  }
`;

const Enemy = ({ id, x, y, flip, state }) => {
  const dispatch = useDispatch();
  const idle = useCallback(() => {
    dispatch(changeState("IDLE"));
  }, [dispatch])
  const tick = useSelector((state) => state.game.tick);

  useEffect(() => {
    if (!tick) { return; }
    dispatch(move());
  }, [dispatch, tick]);

  const [offsetY, jump] = useMove(idle);
  const {left, top} = mapToIsometric(x, y);

  useEffect(() => {
    if (state === "MOVE")  {
      jump();
    }

    return () => {
      // on stateLeave,
    };
  }, [jump, state]);

  return (
    <EnemyWrapper>
      <Position x={left} y={top}>
        <Sprite
          src={enemySprite}
          width={16}
          height={16}
          z={1}
          offsetX={8}
          offsetY={8 + offsetY}
          flipX={flip}
        />
      </Position>
    </EnemyWrapper>
  );
};

export default Enemy;
