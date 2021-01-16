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
};

export default {
  idle: idleAnimation,
};
