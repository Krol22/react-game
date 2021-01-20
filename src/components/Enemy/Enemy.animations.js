import gsap from "gsap";

export const idleAnimation = (nodeRef) => {
  const SPEED = 1.3;

  const [current] = nodeRef.current.children;

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
  const SPEED = 1.2;

  const [current] = nodeRef.current.children;
  const bodySprite = current.querySelectorAll("#body-sprite");
  const shadowSprite = current.querySelectorAll("#shadow-sprite");

  const timeline = gsap.timeline();

  const elements = [bodySprite];

  timeline
    .to(elements, { y: "-=5", duration: .3 * SPEED })
    .to(elements, { rotationZ: 90, duration: .5 * SPEED }, .1 * SPEED)
    .to(elements, { y: "=+3", duration: .2 * SPEED }, .4 * SPEED)
    .to([...elements, shadowSprite], { display: "none" }, .7);

  return timeline;
};

export const hitAnimation = (nodeRef) => {
  const current = nodeRef.current;

  const playerSprite = current.querySelectorAll("#body-sprite");
  const shadowSprite = current.querySelectorAll("#shadow-sprite");

  const elements = [playerSprite, shadowSprite];

  const timeline = gsap.timeline();

  timeline
    .to(elements, { filter: "brightness(100)", duration: .05 });

  return timeline;
};


export default {
  idle: idleAnimation,
  dead: deadAnimation,
  hit: hitAnimation
};
