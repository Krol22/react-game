import gsap from "gsap";

export const idleAnimation = (nodeRef) => {
  const [current] = nodeRef.current.children;

  const playerSprite = current.querySelectorAll("#player-sprite");

  gsap.set([playerSprite], { autoAlpha: 1 });

  const timeline = gsap.timeline({ repeat: -1 });

  timeline.fromTo(playerSprite, { y: "-=0" }, { duration: .2, y: "+=2", autoAlpha: 1 })
    .to(playerSprite, { y: "-=2", duration: .4 })
    .to(playerSprite, { y: "-=0", duration: .1 });

  return timeline;
};

export const testAnimation = (nodeRef) => {
  const current = nodeRef.current;

  gsap.set([current], { autoAlpha: 1 });

  const timeline = gsap.timeline({ repeat: 3 });

  timeline.fromTo(current, { x: "-=0" }, { duration: .01, x: "+=2", autoAlpha: 1 })
    .to(current, { x: "-=2", duration: .02 })
    .to(current, { x: "-=0", duration: .01 });

  return timeline;
};

export default {
  test: testAnimation,
  idle: idleAnimation,
};
