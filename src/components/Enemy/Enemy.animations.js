import gsap from "gsap";

export const idleAnimation = (nodeRef) => {
  const SPEED = 1;

  const [current] = nodeRef.current.children;

  const bodySprite = current.querySelectorAll("#body-sprite");

  const timeline = gsap.timeline({ repeat: -1 });

  timeline
    .to(bodySprite, { y: "=0", duration: 0.0001 })
    .to(bodySprite, { y: "+=1", duration: .3 * SPEED }, 0)
    .to(bodySprite, { y: "=0", duration: .3 * SPEED }, .3 * SPEED);
};

export default {
  idle: idleAnimation,
};
