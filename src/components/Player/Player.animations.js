import gsap from "gsap";

import { TILE_WIDTH_HALF, TILE_HEIGHT_HALF } from "../../constants";

export const idleAnimation = (nodeRef) => {
  const current = nodeRef.current;

  const playerSprite = current.querySelectorAll("#player-sprite");
  const weaponSprite = current.querySelectorAll("#player-weapon");

  gsap.set([playerSprite, weaponSprite], { y: "=0" });

  const timeline = gsap.timeline({ repeat: -1 });

  timeline
    .to(playerSprite, { duration: .3, y: "+=1" })
    .to(playerSprite, { y: "=0", duration: .3 });

  timeline.to(weaponSprite, { duration: .3, y: "+=1" }, .1)
    .to(weaponSprite, { y: "=0", duration: .3}, .4);

  return timeline;
};

export const hitAnimation = (nodeRef) => {
  const bodySprite = nodeRef.current.querySelectorAll("#player-sprite");
  const weaponSprite = nodeRef.current.querySelectorAll("#player-weapon");

  const elements = [bodySprite, weaponSprite];

  gsap.to(elements, { filter: "brightness(100)", duration: .1 });
  gsap.to(elements, { filter: "initial", duration: .05, delay: .1 });
};

export const spawnAnimation = (nodeRef) => {
  const bodySprite = nodeRef.current.querySelectorAll("#player-sprite");
  const weaponSprite = nodeRef.current.querySelectorAll("#player-weapon");

  const elements = [bodySprite, weaponSprite];

  gsap.set([elements], { y: "-=200" });

  const timeline = gsap.timeline();

  timeline
    .to(elements, { duration: .4, y: "=0", delay: .3, ease: "bounce.out"})
    .to(elements, { duration: .4, y: "=0", ease: "bounce.out" });

  return timeline;
};


export const testAnimation = (nodeRef) => {
  const current = nodeRef.current;

  const playerSprite = current.querySelectorAll("#player-sprite");
  const weaponSprite = current.querySelectorAll("#player-weapon");

  const elements = [playerSprite, weaponSprite];

  const timeline = gsap.timeline({ repeat: 3 });

  gsap.set(elements, { x: "=0" });

  timeline.fromTo(elements, { x: "-=0" }, { duration: .01, x: "+=2"})
    .to(elements, { x: "-=2", duration: .02 })
    .to(elements, { x: "-=0", duration: .01 });

  return timeline;
};

export const attackAnimation = (nodeRef, direction) => {
  const SPEED = .6;
  const current = nodeRef.current;

  const playerSprite = current.querySelectorAll("#player-sprite");
  const weaponSprite = current.querySelectorAll("#player-weapon");
  const shadowSprite = current.querySelectorAll("#shadow-sprite");

  const elements = [playerSprite, weaponSprite, shadowSprite];

  gsap.set([playerSprite], { x: "=0", y: "=0" });
  gsap.set([weaponSprite], { x: "=0", y: "=0" });

  const timeline = gsap.timeline();

  let xSign = "-";
  let ySign = "-";

  switch (direction) {
    case "TOP":
      xSign = "+"; 
      ySign = "-";
      break;
    case "LEFT":
      xSign = "+"; 
      ySign = "-";
      break;
    case "RIGHT":
      xSign = "+"; 
      ySign = "+";
      break;
    case "BOTTOM":
      xSign = "+"; 
      ySign = "+";
      break;
  }

  timeline
    .to(elements, {
      x: `${xSign}=${TILE_WIDTH_HALF / 2}`,
      y: `${ySign}=${TILE_HEIGHT_HALF / 2}`,
      duration: .4 * SPEED,
    }, 0 * SPEED)
    .to(elements, {
      x: `=0`,
      y: `=0`,
      duration: .4 * SPEED,
    });


  timeline
    .to(weaponSprite, { rotate: 85 , duration: .3 * SPEED, ease: "back.in(2)" }, 0 * SPEED)
    .to(weaponSprite, { x: `${xSign}=${TILE_WIDTH_HALF}`, duration: .4 * SPEED }, 0 * SPEED)
    .to(weaponSprite, { rotate: -45, duration: .3 * SPEED }, .4 * SPEED);

  return timeline;
};

export const moveAnimation = (nodeRef, direction) => {
  const SPEED = 1;

  const current = nodeRef.current;

  const playerSprite = current.querySelectorAll("#player-sprite");
  const weaponSprite = current.querySelectorAll("#player-weapon");
  const shadowSprite = current.querySelectorAll("#shadow-sprite");
  
  const elements = [playerSprite, weaponSprite];

  const timeline = gsap.timeline();

  let xSign = "-";
  let ySign = "-";
  let ease = "back.out(4)"

  switch (direction) {
    case "TOP":
      xSign = "-"; 
      ySign = "+";
      ease = "back.out(4)";
      break;
    case "LEFT":
      xSign = "-"; 
      ySign = "+";
      ease = "back.out(4)";
      break;
    case "RIGHT":
      xSign = "-"; 
      ySign = "-";
      ease = "power2.in";
      break;
    case "BOTTOM":
      xSign = "-"; 
      ySign = "-";
      ease = "power3.in";
      break;
  }

  timeline.to([...elements, shadowSprite], { x: `${xSign}=${TILE_WIDTH_HALF}`, y: `${ySign}=${TILE_HEIGHT_HALF}`, duration: 0.0001 });

  timeline
    .to(elements, { x: `=0`, duration: .4 * SPEED }, 0 * SPEED)
    .to(elements, { y: `=0`, duration: .4 * SPEED, ease }, 0 * SPEED);

  timeline
    .to(shadowSprite, { x: `=0`, duration: .4 * SPEED }, 0 * SPEED)
    .to(shadowSprite, { y: `=0`, duration: .4 * SPEED }, 0 * SPEED);

  return timeline;
};

export default {
  test: testAnimation,
  idle: idleAnimation,
  attack: attackAnimation,
  spawn: spawnAnimation,
  move: moveAnimation,
};
