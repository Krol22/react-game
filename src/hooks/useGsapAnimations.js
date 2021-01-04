import { useState, useCallback } from "react";

const useGsapAnimations = (nodeRef, animations = []) => {
  const [timeline, setTimeline] = useState(null);

  const playAnimation = useCallback((animationName) => {
    if (timeline) {
      // stop and reverse previous animation if exists,
      // TODO: this doesn't actually work properly xD
      timeline.reverse();
      timeline.kill();
    }

    if (!animations[animationName]) {
      console.error(`No animation called ${animationName}`);
      return;
    }

    const newTimeline = animations[animationName](nodeRef);

    setTimeline(newTimeline);
  }, [animations, timeline, nodeRef]);

  return { playAnimation };
};

export default useGsapAnimations;
