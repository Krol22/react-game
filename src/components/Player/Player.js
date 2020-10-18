import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Position from "../Game/Position";
import Sprite from "../Game/Sprite";
import Weapon from "./Weapon";
import ParticleEmitter from "../Game/ParticleEmitter";

import { mapToIsometric } from "../../helpers/mapToIsometric";
import { movePlayer, idle, skipTurn } from "../../features/gameSlice";
import useMove from "../useMove";
import useAttack from "./usePlayerAttack";

import playerSprite from "../../assets/Player.png";

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

  ${({ state }) => state === "IDLE" && `
    transform: translateY(0);
    animation-name: idle;  
    animation-duration: 0.3s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  `}

  ${({ state }) => state === "HIT" && `
    animation-name: hit;
    animation-duration: 0.1s;
    animation-delay: 0.3s;
    animation-timing-function: linear;
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
  const { x, y, flip, playerState } = useSelector((state) => state.game.player);

  // StateManager
  useEffect(() => {
    // onStateEnter,
    if (playerState === playerStates.MOVE) {
      jump();
    }

    if (playerState === playerStates.HIT_WALL) {
      playAttack(moveDirection);
    }

    if (playerState === playerStates.ATTACK) {
      playAttack(moveDirection);
    }

    if (playerState === "HIT") {
      // todo: change name
      setTimeout(() => {
        test();
      }, 400);
    }

    return () => {};
  }, [
    playAttack,
    jump,
    playerState
  ]);

  useEffect(() => {
    return () => {
    }
  }, [playerState]);

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
        move({ x: -1 }); 
        return;
      } else if (e.keyCode === 39) {
        move({ x: 1 });
        return;
      } else if (e.keyCode === 38) {
        move({ y: -1 });
        return;
      } else if (e.keyCode === 40) {
        move({ y: 1 });
        return;
      } else if (e.keyCode === 32) {
        dispatch(skipTurn());
        return;
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
       window.removeEventListener("keydown", onKeyDown);
    }
  }, [shouldTick, playerState]);

  const { left, top } = mapToIsometric(x, y); 

  return (
    <Position x={left} y={top}>
      <PlayerWrapper state={playerState}>
        <Sprite
          src={playerSprite}
          width={16}
          height={16}
          z={1}
          offsetX={8 + attackOffsetX}
          offsetY={-8 + offsetY + attackOffsetY}
          flipX={flip}
        />
        <Weapon 
          x={0}
          y={0} 
          flip={flip}
          offsetY={-34 + offsetY + attackOffsetY}
          offsetX={attackOffsetX}
          angle={weaponAngle}
        />
      </PlayerWrapper>
    </Position>
  );
};

export default Player;
