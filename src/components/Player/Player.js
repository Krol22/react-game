import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Position from "../Position";
import Sprite from "../Sprite";

import { mapToIsometric } from "../../helpers/mapToIsometric";
import { moveUp, moveDown, moveLeft, moveRight, idle } from "../../features/gameSlice";
import { PLAYER_MOVE_TIME } from "../../constants";

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
};

const Player = () => {
  const dispatch = useDispatch();
  const [offsetY, setOffsetY] = useState(0);
  const { x, y, flip, playerState } = useSelector((state) => {
    return state.game.player;
  });

  // StateManager
  useEffect(() => {
    // onStateEnter,
    if (playerState === playerStates.MOVE) {
      setOffsetY(-10);

      setTimeout(() => {
        setOffsetY(0);
      }, PLAYER_MOVE_TIME / 2);

      setTimeout(() => {
        dispatch(idle());
      }, PLAYER_MOVE_TIME);
    }

    if (playerState === playerStates.HIT_WALL) {
      setOffsetY(-10);

      setTimeout(() => {
        setOffsetY(0);
      }, PLAYER_MOVE_TIME / 2);

      setTimeout(() => {
        dispatch(idle());
      }, PLAYER_MOVE_TIME);
    }

    return () => {
      // on stateLeave,
    }
  }, [playerState]);

  // change to move state,
  const move = useCallback(moveAction => {
    if (playerState !== playerStates.IDLE) {
      return;
    }
    dispatch(moveAction());
  }, [dispatch, playerState]);

  // this should be in external function;
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.keyCode === 37) {
        move(moveLeft) 
      } else if (e.keyCode === 39) {
        move(moveRight);
      } else if (e.keyCode === 38) {
        move(moveUp);
      } else if (e.keyCode === 40) {
        move(moveDown);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
       window.removeEventListener("keydown", onKeyDown);
    }
  }, [playerState]);

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
