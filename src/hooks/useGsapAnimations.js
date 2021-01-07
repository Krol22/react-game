import { useState, useCallback } from "react";

const useGsapAnimations = (nodeRef, animations = []) => {
  const [timeline, setTimeline] = useState(null);

  const playAnimation = useCallback((animationName, props) => {
    if (timeline) {
      // stop and remove previous animation if exists,
      timeline.restart();
      timeline.kill();
    }

    if (!animations[animationName]) {
      console.error(`No animation called ${animationName}`);
      return;
    }

    const newTimeline = animations[animationName](nodeRef, props);

    setTimeline(newTimeline);
  }, [animations, timeline, nodeRef]);

  return { playAnimation };
};

export default useGsapAnimations;
