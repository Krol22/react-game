import gsap from "gsap";

import { TILE_WIDTH_HALF, TILE_HEIGHT_HALF } from "../../constants";

export const idleAnimation = (nodeRef) => {
  const SPEED = 1.3;

  const current = nodeRef.current;

  const bodySprite = current.querySelectorAll("#body-sprite");

  const timeline = gsap.timeline({ repeat: -1 });

  const randomStartTime = 0.1 * Math.random() * SPEED;

  timeline
    .to(bodySprite, { y: "=0", duration: 0.0001 })
    .to(bodySprite, { y: "+=1", duration: .3 * SPEED }, randomStartTime)
    .to(bodySprite, { y: "=0", duration: .3 * SPEED }, randomStartTime + .3 * SPEED);

  return timeline;
};

export const deadAnimation = (nodeRef) => {
  const SPEED = 0.7;

  const current = nodeRef.current;
  const bodySprite = current.querySelectorAll("#body-sprite");
  const shadowSprite = current.querySelectorAll("#shadow-sprite");

  const timeline = gsap.timeline();

  const elements = [bodySprite];

  timeline
    .to(elements, { y: "-=5", duration: .3 * SPEED })
    .to(elements, { rotationZ: 90, duration: .3 * SPEED }, .1 * SPEED)
    .to(elements, { y: "=+3", duration: .2 * SPEED }, .4 * SPEED)
    .to([...elements, shadowSprite], { opacity: 0, ease: "steps(3)" }, .7);

  return timeline;
};

export const hitAnimation = (nodeRef) => {
  const bodySprite = nodeRef.current.querySelectorAll("#body-sprite");

  gsap.to(bodySprite, { filter: "brightness(100)", duration: .1 });
  gsap.to(bodySprite, { filter: "initial", duration: .05, delay: .1 });
};

export const moveAnimation = (nodeRef, direction) => {
  const SPEED = 1;

  const current = nodeRef.current;

  const bodySprite = current.querySelectorAll("#body-sprite");
  const shadowSprite = current.querySelectorAll("#shadow-sprite");
  const healthBar = current.querySelectorAll("#health-bar");

  const elements = [bodySprite];

  if (healthBar.length) {
    elements.push(healthBar);
  }

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
      xSign = "+"; 
      ySign = "+";
      ease = "back.out(4)";
      break;
    case "RIGHT":
      xSign = "-"; 
      ySign = "-";
      ease = "power2.in";
      break;
    case "BOTTOM":
      xSign = "+"; 
      ySign = "-";
      ease = "power2.in";
      break;
  }

  timeline.to([...elements, shadowSprite], { x: `${xSign}=${TILE_WIDTH_HALF}`, y: `${ySign}=${TILE_HEIGHT_HALF}`, duration: 0.0001 });

  timeline
    .to(elements, { x: `=0`, duration: .4 * SPEED }, 0.1 * SPEED)
    .to(elements, { y: `=0`, duration: .4 * SPEED, ease }, 0.1 * SPEED);

  timeline
    .to(shadowSprite, { x: `=0`, duration: .4 * SPEED }, 0.1 * SPEED)
    .to(shadowSprite, { y: `=0`, duration: .4 * SPEED }, 0.1 * SPEED);

  return timeline;
};

export const attackAnimation = (nodeRef, direction) => {
  const current = nodeRef.current;

  const bodySprite = current.querySelectorAll("#body-sprite");

  const elements = bodySprite;

  const timeline = gsap.timeline();

  let xSign = "-";
  let ySign = "-";
  let ease = "back.out(4)";

  switch (direction) {
    case "TOP":
      xSign = "+"; 
      ySign = "-";
      ease = "back.out(4)";
      break;
    case "LEFT":
      xSign = "-"; 
      ySign = "-";
      ease = "back.out(4)";
      break;
    case "RIGHT":
      xSign = "+"; 
      ySign = "+";
      ease = "power2.in";
      break;
    case "BOTTOM":
      xSign = "-"; 
      ySign = "+";
      ease = "power2.in";
      break;
  }

  timeline
    .to(elements, { x: `${xSign}=${TILE_WIDTH_HALF / 2}`, duration: .4}, 0)
    .to(elements, { y: `${ySign}=${TILE_HEIGHT_HALF / 2}`, duration: .4, ease }, 0);

  timeline
    .to(bodySprite, { rotate: Math.sign(xSign+1) * 65, duration: .3, ease: "back.in(4)" }, 0);

  return timeline;
};

export default {
  idle: idleAnimation,
  dead: deadAnimation,
  move: moveAnimation,
  attack: attackAnimation,
};
