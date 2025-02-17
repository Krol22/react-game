import { useState, useCallback } from "react";

const useGsapAnimations = (nodeRef, animations = []) => {
  const [timeline, setTimeline] = useState(null);

  const playAnimation = useCallback((animationName, props) => {
    if (!animations[animationName]) {
      console.error(`No animation called ${animationName}`);
      return;
    }

    if (timeline) {
      // stop and remove previous animation if exists,
      timeline.restart();
      timeline.repeat(0);
      timeline.kill();
    }

    const newTimeline = animations[animationName](nodeRef, props);
    
    if (!newTimeline) {
      console.error(`Animation ${animationName} should return timeline in order to correctly clear!`);
    }

    setTimeline(newTimeline);

    return newTimeline;
  }, [animations, timeline, nodeRef]);

  return { playAnimation };
};

export default useGsapAnimations;
