import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useInterval } from "beautiful-react-hooks";

import Position from "../Position";
import Sprite from "../Sprite";
import Weapon from "./Weapon";

import { mapToIsometric } from "../../helpers/mapToIsometric";
import { movePlayer, idle, skipTurn } from "../../features/gameSlice";
import useMove from "../useMove";
import useIdle from "../useIdle";

import playerSprite from "../../assets/Player.png";
import useAttack from "../useAttack";

const PlayerWrapper = styled.div`
  ${Position} {
    transition: all 0.5s ease-in-out;
  }

  ${Sprite} {
    transition: 
      top 0.2s ease-in-out,
      left 0.2s ease-in-out,
      transform 0.1s ease-in-out;
  }

  ${({ state }) => state === "ATTACK" && `
    ${Sprite} {
      transition: 
        top 0.1s ease-in-out,
        left 0.1s ease-in-out;
    }
  `}
`;

const playerStates = {
  IDLE: "IDLE",
  MOVE: "MOVE",
  HIT_WALL: "HIT_WALL",
  ATTACK: "ATTACK",
};

const Player = () => {
  const dispatch = useDispatch();
  const [moveDirection, setMoveDirection] = useState({});

  const test = useCallback(() => {
    dispatch(idle());
  }, [dispatch])

  const [offsetY, jump] = useMove(test);
  const [attackOffsetX, attackOffsetY, weaponAngle, playAttack] = useAttack(test);
  const shouldTick = useSelector((state) => state.game.shouldTick);
  const [frame, play, pause] = useIdle(1);
  const { x, y, flip, playerState } = useSelector((state) => state.game.player);

  // StateManager
  useEffect(() => {
    // onStateEnter,
    if (playerState === playerStates.IDLE) {
      play();
    }

    if (playerState === playerStates.MOVE) {
      jump();
    }

    if (playerState === playerStates.HIT_WALL) {
      playAttack(moveDirection);
    }

    if (playerState === playerStates.ATTACK) {
      playAttack(moveDirection);
    }

    return () => {
      if (playerState === playerStates.IDLE) {
        pause();
      }
    };
  }, [
    playAttack,
    jump,
    playerState
  ]);

  useEffect(() => {
    return () => {
    }
  }, [playerState, pause]);

  // change to move state,
  const move = useCallback(direction => {
    if (playerState !== playerStates.IDLE) {
      return;
    }
    setMoveDirection(direction);
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
      } else if (e.keyCode === 32) {
        dispatch(skipTurn());
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
       window.removeEventListener("keydown", onKeyDown);
    }
  }, [shouldTick, playerState]);

  const { left, top } = mapToIsometric(x, y); 

  return (
    <PlayerWrapper state={playerState}>
      <Position x={left} y={top}>
        <Sprite
          src={playerSprite}
          width={16}
          height={16}
          z={1}
          offsetX={8 + attackOffsetX}
          offsetY={8 + offsetY + attackOffsetY + (frame * 1)}
          flipX={flip}
        />
      </Position>
      <Weapon 
        x={left}
        y={top} 
        flip={flip}
        offsetY={offsetY + attackOffsetY + (frame * 1)}
        offsetX={attackOffsetX}
        angle={weaponAngle}
      />
    </PlayerWrapper>
  );
};

export default Player;
