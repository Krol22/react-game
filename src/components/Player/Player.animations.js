import gsap from "gsap";

import { TILE_WIDTH_HALF, TILE_HEIGHT_HALF } from "../../constants";

export const idleAnimation = (nodeRef) => {
  const [current] = nodeRef.current.children;

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

export const testAnimation = (nodeRef) => {
  const [current] = nodeRef.current.children;

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

export const attackAnimation = (nodeRef) => {
  const SPEED = .9;
  const [current] = nodeRef.current.children;

  const playerSprite = current.querySelectorAll("#player-sprite");
  const weaponSprite = current.querySelectorAll("#player-weapon");

  gsap.set([playerSprite], { x: "=0", y: "=0" });
  gsap.set([weaponSprite], { x: "=0", y: "=0" });

  const timeline = gsap.timeline({ repeat: -1 });

  timeline
    .to([playerSprite, weaponSprite], { x: "+=20", duration: .4 * SPEED })
    .to([playerSprite, weaponSprite], { y: "-=4", duration: .2 * SPEED }, 0 * SPEED)
    .to([playerSprite, weaponSprite], { y: "=0", duration: .2 * SPEED }, .2 * SPEED)
    .to([playerSprite, weaponSprite], { x: "=0", duration: .6 * SPEED });

  timeline
    .to(weaponSprite, { rotate: -80, duration: .1 * SPEED }, 0 * SPEED)
    .to(weaponSprite, { x: "+=20", rotate: 90, duration: .3 * SPEED }, .1 * SPEED)
    .to(weaponSprite, { x: "=0", rotate: -45, duration: .6 * SPEED }, .4 * SPEED);

  return timeline;
};

export const moveAnimation = (nodeRef, direction) => {
  const SPEED = 1;

  const [current] = nodeRef.current.children;

  const playerSprite = current.querySelectorAll("#player-sprite");
  const weaponSprite = current.querySelectorAll("#player-weapon");
  const shadowSprite = current.querySelectorAll("#shadow-sprite");
  
  const elements = [playerSprite, weaponSprite];

  const timeline = gsap.timeline();

  if (direction === "TOP") {
    timeline.to([...elements, shadowSprite], { x: `-=${TILE_WIDTH_HALF}`, y: `+=${TILE_HEIGHT_HALF}`, duration: 0.0001 });

    timeline
      .to(elements, { x: `=0`, duration: .4 * SPEED }, 0 * SPEED)
      .to(elements, { y: `=0`, duration: .4 * SPEED, ease: "back.out(4)" }, 0 * SPEED);

    timeline
      .to(shadowSprite, { x: `=0`, duration: .4 * SPEED }, 0 * SPEED)
      .to(shadowSprite, { y: `=0`, duration: .4 * SPEED }, 0 * SPEED);

    return timeline;
  }

  if (direction === "BOTTOM") {
    timeline.to([...elements, shadowSprite], { x: `+=${TILE_WIDTH_HALF}`, y: `-=${TILE_HEIGHT_HALF}`, duration: 0.0001 });

    timeline
      .to(elements, { x: `=0`, duration: .4 * SPEED }, 0 * SPEED)
      .to(elements, { y: `=0`, duration: .4 * SPEED, ease: "power3.in" }, 0 * SPEED);

    timeline
      .to(shadowSprite, { x: `=0`, duration: .4 * SPEED }, 0 * SPEED)
      .to(shadowSprite, { y: `=0`, duration: .4 * SPEED }, 0 * SPEED);

    return timeline;
  }

  if (direction === "RIGHT") {
    // gsap.set(elements, { x: `-=${TILE_WIDTH_HALF}`, y: `-=${TILE_HEIGHT_HALF}` });
    // don't use set instead it's better to use timeline as I can easlily remove set values
    timeline.to([...elements, shadowSprite], { x: `-=${TILE_WIDTH_HALF}`, y: `-=${TILE_HEIGHT_HALF}`, duration: 0.0001 });

    timeline
      .to(elements, { x: `=0`, duration: .4 * SPEED }, 0 * SPEED)
      .to(elements, { y: `=0`, duration: .4 * SPEED, ease: "power2.in" }, 0 * SPEED);

    timeline
      .to(shadowSprite, { x: `=0`, duration: .4 * SPEED }, 0 * SPEED)
      .to(shadowSprite, { y: `=0`, duration: .4 * SPEED }, 0 * SPEED);

    return timeline;
  }

  if (direction === "LEFT") {
    // gsap.set(elements, { x: `+=${TILE_WIDTH_HALF}`, y: `+=${TILE_HEIGHT_HALF}` });
    timeline.to([...elements, shadowSprite], { x: `+=${TILE_WIDTH_HALF}`, y: `+=${TILE_HEIGHT_HALF}`, duration: 0.0001 });

    timeline
      .to(elements, { x: `=0`, duration: .4 * SPEED }, 0 * SPEED)
      .to(elements, { y: `=0`, duration: .4 * SPEED, ease: "back.out(4)" }, 0 * SPEED);

    timeline
      .to(shadowSprite, { x: `=0`, duration: .4 * SPEED }, 0 * SPEED)
      .to(shadowSprite, { y: `=0`, duration: .4 * SPEED }, 0 * SPEED);

    return timeline;
  }

  return timeline;
};


export default {
  test: testAnimation,
  idle: idleAnimation,
  attack: attackAnimation,
  move: moveAnimation,
};
