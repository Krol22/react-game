import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Position from "../Position";
import Sprite from "../Sprite";

import { mapToIsometric } from "../../helpers/mapToIsometric";
import { movePlayer, idle } from "../../features/gameSlice";
import useMove from "../useMove";

import playerSprite from "../../assets/Player.png";

const PlayerWrapper = styled.div`
  ${Position} {
    transition: all 0.5s ease-in-out;
  }

  ${Sprite} {
    transition: top 0.2s ease-in-out, transform 0.1s ease-in-out;
  }
`;

const playerStates = {
  IDLE: "IDLE",
  MOVE: "MOVE",
  HIT_WALL: "HIT_WALL",
  ATTACK: "ATTACK",
};

const Player = () => {
  const dispatch = useDispatch();

  const test = useCallback(() => {
    dispatch(idle());
  }, [dispatch])

  const [offsetY, jump] = useMove(test);
  const shouldTick = useSelector((state) => state.game.shouldTick);
  const { x, y, flip, playerState } = useSelector((state) => state.game.player);

  // StateManager
  useEffect(() => {
    // onStateEnter,
    if (playerState === playerStates.MOVE) {
      jump();
    }

    if (playerState === playerStates.HIT_WALL) {
      jump();
    }

    if (playerState === playerStates.ATTACK) {
      console.log("Attack");
      test();
    }

    return () => {
      // on stateLeave,
    }
  }, [jump, playerState]);

  // change to move state,
  const move = useCallback(direction => {
    if (playerState !== playerStates.IDLE) {
      return;
    }
    dispatch(movePlayer(direction));
  }, [dispatch, playerState]);

  // this should be in external function;
  useEffect(() => {
    const onKeyDown = (e) => {
      if (shouldTick) {
        return;
      }

      if (e.keyCode === 37) {
        move({ x: -1 }) 
      } else if (e.keyCode === 39) {
        move({ x: 1 });
      } else if (e.keyCode === 38) {
        move({ y: -1 });
      } else if (e.keyCode === 40) {
        move({ y: 1 });
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
       window.removeEventListener("keydown", onKeyDown);
    }
  }, [shouldTick, playerState]);

  const { left, top } = mapToIsometric(x, y); 

  return (
    <PlayerWrapper>
      <Position x={left} y={top}>
        <Sprite
          src={playerSprite}
          width={16}
          height={16}
          z={1}
          offsetX={8}
          offsetY={8 + offsetY}
          flipX={flip}
        />
      </Position>
    </PlayerWrapper>
  );
};

export default Player;
