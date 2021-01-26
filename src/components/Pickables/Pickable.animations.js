import gsap from "gsap";

export const idleAnimation = (nodeRef) => {
  const current = nodeRef.current;

  const sprite = current.querySelectorAll("#sprite");

  const timeline = gsap.timeline({ repeat: -1 });

  timeline
    .to(sprite, { duration: .4, y: "+=1" })
    .to(sprite, { duration: .4, y: "=0" })

  return timeline;
};

export const pickAnimation = (nodeRef) => {
  const current = nodeRef.current;

  const sprite = current.querySelectorAll("#sprite");

  const timeline = gsap.timeline();

  timeline
    .to(sprite, { duration: .2, y: "-=20" })
    .to(sprite, { duration: .2, opacity: 0, ease: "steps(2)" });

  return timeline;
};

export const spawnAnimation = (nodeRef) => {
  const current = nodeRef.current;
  const sprite = current.querySelectorAll("#sprite");
  const timeline = gsap.timeline();

  timeline
    .to(sprite, { duration: .1, y: "-=5" })
    .to(sprite, { duration: .1, y: "=0" });

  return timeline;
}

export default {
  idle: idleAnimation,
  pick: pickAnimation,
  spawn: spawnAnimation,
};
